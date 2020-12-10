import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.input';
import { AuthenticationError } from 'apollo-server-core';
import { ChangeRoleDto } from 'src/auth/dto/change-role.dto';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';
import { UsersService } from 'src/users/users.service';
import { UseGuards } from '@nestjs/common';
import { UserInputError } from 'apollo-server-core';
import { MailService } from 'src/mail/mail.service';
import * as generator from 'generate-password';
import { RedisDbService } from 'src/redis-db/redis-db.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { SmsService } from 'src/sms/sms.service';
import { ChangePassByTokenDto } from './dto/changePassByToken.dto';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { User } from 'src/graphql';
import { Roles } from './decorators/roles.decorator';
import { userRole } from 'src/users/enums/userRole.enum';
var jwt = require('jsonwebtoken');

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly redisService: RedisDbService,
    private readonly jwtService: JwtService,
    private readonly smsService: SmsService,
  ) {}

  @Query('login')
  async login(@Args('loginCredentials') loginCredentials: LoginDto) {
    const user = await this.authService.validateUser(loginCredentials);

    const rdsUser = await this.redisService.getUser(user.id);

    const accessToken = await this.authService.createAccessJwt(user.id);

    const refreshToken = await this.authService.createRefreshJwt(
      user.id,
      rdsUser.count,
    );

    await this.redisService.saveToken(user.id, refreshToken);

    const loginResponse = {
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
      role: rdsUser.role,
    };

    return loginResponse;
  }

  @Mutation('refreshToken')
  async refreshToken(@Args('refreshToken') refreshToken: string): Promise<any> {
    try {
      const decodedJWT = jwt.verify(
        refreshToken,
        process.env.REFRESH_JWT_SECRET,
      );

      const user = await this.redisService.getUser(decodedJWT.id);

      if (
        refreshToken === user.refreshToken &&
        decodedJWT.count === user.count // count mechanism is an alternative to blackmailing tokens
      ) {
        const newAccessToken = await this.authService.createAccessJwt(
          decodedJWT.id,
        );

        const newRefreshToken = await this.authService.createRefreshJwt(
          decodedJWT.id,
          decodedJWT.count,
        );

        await this.redisService.saveToken(decodedJWT.id, newRefreshToken);

        const TokenResponse = {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        };

        return TokenResponse;
      }
    } catch (err) {
      throw new AuthenticationError(err);
    }
  }

  @Mutation()
  @Roles(userRole.ROOT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async changeRole(
    @Args('changeRoleInput') changeRoleData: ChangeRoleDto,
  ): Promise<Boolean> {
    await this.authService.changeRole(changeRoleData);

    return true;
  }

  @Mutation()
  async confirmUser(
    @Args('confirmToken') confirmToken: string,
  ): Promise<Boolean> {
    try {
      const { id } = this.jwtService.verify(confirmToken, {
        secret: process.env.CONFIRM_JWT_SECRET,
      });

      const actualToken = await this.redisService.getValue(id, 'confirmtoken');

      if (confirmToken == actualToken) {
        await this.redisService.confirmUser(id);

        await this.redisService.deleteKeyField(id, 'confirmtoken');
      } else {
        throw new Error('Please check your email. Token is not valid.');
      }

      return true;
    } catch (err) {
      throw new Error(`Can not confirm user: ${err.message}`);
    }
  }

  @Mutation()
  async changeConfirmToken(@Args('email') email: string): Promise<Boolean> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (user == undefined) {
        throw new Error('There is no user with given email!');
      }
      const { id, firstName, lastName } = user;

      const confirmed = await this.redisService.getValue(id, 'confirmed');

      if (confirmed === 'true') {
        throw new Error('User has been confirmed earlier.');
      }

      const JWTpayload = {
        id: id,
      };

      const JWToptions = {
        secret: process.env.CONFIRM_JWT_SECRET,
        expiresIn: process.env.CONFIRM_JWT_EXP,
      };

      const newConfirmJWT = await this.authService.createJWT(
        JWTpayload,
        JWToptions,
      );

      await this.redisService.saveToken(id, newConfirmJWT);

      const newConfirmLink = `${process.env.FRONTEND_URL}/users/confirm-account?token=${newConfirmJWT}`;

      const mail = {
        greeting: `Hi ${firstName} ${lastName}!`,
        content: `We've heard that you asked for new confirmation link.
                Please confirm your mail by clicking in this link: ${newConfirmLink}. 
                Make sure you don't share this link publicly, because it's unique for you!`,
        subject: `Resend confirmation link`,
        mailAddress: email,
      };

      this.mailService.sendMail(mail);

      return new Boolean(true);
    } catch (err) {
      throw new Error(`Can not resend confirmation link: ${err.message}`);
    }
  }

  @Mutation()
  async sendCodePhone(
    @Args('phoneNumber') phoneNumber: string,
  ): Promise<Boolean> {
    try {
      const user = await this.usersService.findOneByPhoneNumber(phoneNumber);

      if (user == undefined) {
        throw new Error('Wrong phone number.');
      }

      const randomNumber = Math.floor(1000 + Math.random() * 9000);

      const JWTpayload = {
        code: randomNumber,
      };

      const JWToptions = {
        secret: process.env.PHONECODE_JWT_SECRET,
        expiresIn: process.env.PHONECODE_JWT_EXP,
      };

      const codeToken = await this.authService.createJWT(
        JWTpayload,
        JWToptions,
      );

      await this.redisService.saveCodeToken(user.id, codeToken);

      const smsData = {
        phoneNumber: user.phoneNumber,
        body: `Your confirmation code for reset password is ${randomNumber}. Please enter it on website within 5 minutes.`,
      };

      await this.smsService.sendSMS(smsData);

      return new Boolean(true);
    } catch (err) {
      throw new Error(`Can not send confirmation code: ${err.message}`);
    }
  }

  @Mutation()
  async resetPassword(
    @Args('resetPasswordInput') { phoneNumber, code }: ResetPasswordDto,
  ): Promise<Boolean> {
    try {
      const user = await this.usersService.findOneByPhoneNumber(phoneNumber);

      if (user == undefined) {
        throw new Error('Wrong phone number.');
      }

      const codeToken = await this.redisService.getValue(user.id, 'codetoken');

      const jwtPayload = await this.jwtService.verify(codeToken, {
        secret: process.env.PHONECODE_JWT_SECRET,
      });

      if (jwtPayload.code !== code) {
        throw new Error('Wrong code.');
      }

      const password = generator.generate({
        length: 8,
        numbers: true,
      });

      await this.redisService.deleteKeyField(user.id, 'codetoken');

      await this.usersService.changePasswordByUser(user.id, password);

      const smsData = {
        phoneNumber: user.phoneNumber,
        body: `Your new password is ${password}. Log in and change it quickly.`,
      };

      await this.smsService.sendSMS(smsData);

      return new Boolean(true);
    } catch (err) {
      throw new Error(`Can not reset password: ${err.message}`);
    }
  }

  @Mutation()
  async sendChangePassEmail(@Args('email') email: string): Promise<Boolean> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (user == undefined) {
        throw new Error('Wrong email.');
      }

      const JWTpayload = {
        id: user.id,
      };

      const JWToptions = {
        secret: process.env.EMAIL_JWT_SECRET,
        expiresIn: process.env.EMAIL_JWT_EXP,
      };

      const changePassToken = await this.authService.createJWT(
        JWTpayload,
        JWToptions,
      );

      await this.redisService.saveEmailToken(user.id, changePassToken);

      const changePassLink = `${process.env.FRONTEND_URL}/users/reset-password/changePass?token=${changePassToken}`;

      const mail = {
        greeting: `Hi ${user.firstName} ${user.lastName}!`,
        content: `We've heard that you forget your password.
                Please click in this link: ${changePassLink}. 
                Make sure you don't share this link publicly, because it's unique!`,
        subject: `Forget password`,
        mailAddress: user.email,
      };

      this.mailService.sendMail(mail);

      return new Boolean(true);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation()
  async changePassByToken(
    @Args('changePassByTokenInput') { token, password }: ChangePassByTokenDto,
  ): Promise<Boolean> {
    try {
      const { id } = this.jwtService.verify(token, {
        secret: process.env.EMAIL_JWT_SECRET,
      });

      const actualToken = await this.redisService.getValue(
        id,
        'changepasstoken',
      );

      if (token === actualToken) {
        await this.usersService.changePasswordByUser(id, password);

        await this.redisService.deleteKeyField(id, 'changepasstoken');
        return new Boolean(true);
      } else {
        throw new Error('Link is not valid.');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async changePassword(
    @CurrentUser() user: User,
    @Args('password') password: string,
  ): Promise<Boolean> {
    try {
      await this.usersService.changePasswordByUser(user.id, password);

      return new Boolean(true);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation()
  async logout(@Args('id') id: string): Promise<Boolean> {
    try {
      await this.redisService.deleteKeyField(id, 'refreshtoken');

      return new Boolean(true);
    } catch (err) {
      throw new Error(err);
    }
  }
}
