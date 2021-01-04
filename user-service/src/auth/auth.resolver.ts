import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthenticationError } from 'apollo-server-core';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import * as generator from 'generate-password';
import { SmsService } from '../sms/sms.service';
import {
  AuthGqlRedisService,
  RedisHandlerService,
  CurrentUser,
  Auth,
} from '@tomasztrebacz/nest-auth-graphql-redis';
import { LoginResponse, TokenResponse, User } from '../graphql';
import { userRole } from '../enums';
import { ExtendedUser, RedisUser } from '../interfaces';
import {
  ChangePassByTokenDto,
  ChangeRoleDto,
  LoginDto,
  ResetPasswordDto,
} from './dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly redisHandler: RedisHandlerService,
    private readonly authGqlRedisService: AuthGqlRedisService,
    private readonly smsService: SmsService,
  ) {}

  @Query('login')
  async login(
    @Args('loginCredentials') loginCredentials: LoginDto,
  ): Promise<LoginResponse> {
    const partialUser = await this.authService.validateUser(loginCredentials);

    const keys: string[] = ['role', 'count'];
    const redisUser = await this.redisHandler.getFields(partialUser.id, keys);

    const user: ExtendedUser = {
      ...partialUser,
      ...redisUser,
      count: parseInt(redisUser.count),
    };

    const accessToken = await this.authGqlRedisService.createDefaultJWT(
      user.id,
    );

    const refreshPayload = {
      id: user.id,
      count: user.count,
    };

    const refreshToken = await this.authGqlRedisService.createJWT(
      refreshPayload,
      process.env.REFRESH_JWT_SECRET,
      process.env.REFRESH_JWT_EXP,
    );

    const refreshField = new Map<string, string>([
      ['refreshtoken', refreshToken],
    ]);

    await this.redisHandler.setUser(user.id, refreshField);

    const loginResponse = {
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
      role: 'user',
    };

    return loginResponse;
  }

  @Mutation('refreshToken')
  async refreshToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<TokenResponse> {
    try {
      const decodedJWT = await this.authGqlRedisService.verifyToken(
        refreshToken,
        process.env.REFRESH_JWT_SECRET,
      );

      const keys: string[] = ['refreshtoken', 'count'];
      const user: RedisUser = await this.redisHandler.getFields(
        decodedJWT.id,
        keys,
      );

      if (
        refreshToken === user.refreshtoken &&
        decodedJWT.count == user.count // count mechanism is an alternative to blackmailing tokens
      ) {
        const newAccessToken = await this.authGqlRedisService.createDefaultJWT(
          decodedJWT.id,
        );

        const refreshPayload = {
          id: decodedJWT.id,
          count: decodedJWT.count,
        };

        const newRefreshToken = await this.authGqlRedisService.createJWT(
          refreshPayload,
          process.env.REFRESH_JWT_SECRET,
          process.env.REFRESH_JWT_EXP,
        );

        const refreshField = new Map<string, string>([
          ['refreshtoken', newRefreshToken],
        ]);

        await this.redisHandler.setUser(decodedJWT.id, refreshField);

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
  @Auth(userRole.ROOT)
  async changeRole(
    @Args('changeRoleInput') changeRoleData: ChangeRoleDto,
  ): Promise<boolean> {
    await this.authService.changeRole(changeRoleData);

    return true;
  }

  @Mutation()
  async confirmUser(
    @Args('confirmToken') confirmToken: string,
  ): Promise<boolean> {
    try {
      const { id } = await this.authGqlRedisService.verifyToken(
        confirmToken,
        process.env.CONFIRM_JWT_SECRET,
      );

      const actualToken = await this.redisHandler.getValue(id, 'confirmtoken');

      if (confirmToken == actualToken) {
        const confirmField = new Map<string, string>([['confirmed', 'true']]);

        await this.redisHandler.setUser(id, confirmField);

        await this.redisHandler.deleteField(id, 'confirmtoken');
      } else {
        throw new Error('Please check your email. Token is not valid.');
      }

      return true;
    } catch (err) {
      throw new Error(`Can not confirm user: ${err.message}`);
    }
  }

  @Mutation()
  async changeConfirmToken(@Args('email') email: string): Promise<boolean> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (user == undefined) {
        throw new Error('There is no user with given email!');
      }
      const { id, firstName, lastName } = user;

      const confirmed = await this.redisHandler.getValue(id, 'confirmed');

      if (confirmed === 'true') {
        throw new Error('User has been confirmed earlier.');
      }

      const JWTpayload = {
        id: id,
      };

      const newConfirmJWT = await this.authGqlRedisService.createJWT(
        JWTpayload,
        process.env.CONFIRM_JWT_SECRET,
        process.env.CONFIRM_JWT_EXP,
      );

      const confirmField = new Map<string, string>([
        ['confirmtoken', newConfirmJWT],
      ]);

      await this.redisHandler.setUser(id, confirmField);

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

      return true;
    } catch (err) {
      throw new Error(`Can not resend confirmation link: ${err.message}`);
    }
  }

  @Mutation()
  async sendCodePhone(
    @Args('phoneNumber') phoneNumber: string,
  ): Promise<boolean> {
    try {
      const user = await this.usersService.findOneByPhoneNumber(phoneNumber);

      if (user == undefined) {
        throw new Error('Wrong phone number.');
      }

      const randomNumber = Math.floor(1000 + Math.random() * 9000);

      const JWTpayload = {
        code: randomNumber,
      };

      const codeToken = await this.authGqlRedisService.createJWT(
        JWTpayload,
        process.env.PHONECODE_JWT_SECRET,
        process.env.PHONECODE_JWT_EXP,
      );

      const codeField = new Map<string, string>([['codetoken', codeToken]]);

      await this.redisHandler.setUser(user.id, codeField);

      const smsData = {
        phoneNumber: user.phoneNumber,
        body: `Your confirmation code for reset password is ${randomNumber}. Please enter it on website within 5 minutes.`,
      };

      await this.smsService.sendSMS(smsData);

      return true;
    } catch (err) {
      throw new Error(`Can not send confirmation code: ${err.message}`);
    }
  }

  @Mutation()
  async resetPassword(
    @Args('resetPasswordInput') { phoneNumber, code }: ResetPasswordDto,
  ): Promise<boolean> {
    try {
      const user = await this.usersService.findOneByPhoneNumber(phoneNumber);

      if (user == undefined) {
        throw new Error('Wrong phone number.');
      }

      const codeToken = await this.redisHandler.getValue(user.id, 'codetoken');

      const jwtPayload = await this.authGqlRedisService.verifyToken(
        codeToken,
        process.env.PHONECODE_JWT_SECRET,
      );

      if (jwtPayload.code !== code) {
        throw new Error('Wrong code.');
      }

      const password = generator.generate({
        length: 8,
        numbers: true,
      });

      await this.redisHandler.deleteField(user.id, 'codetoken');

      await this.usersService.changePasswordByUser(user.id, password);

      const smsData = {
        phoneNumber: user.phoneNumber,
        body: `Your new password is ${password}. Log in and change it quickly.`,
      };

      await this.smsService.sendSMS(smsData);

      return true;
    } catch (err) {
      throw new Error(`Can not reset password: ${err.message}`);
    }
  }

  @Mutation()
  async sendChangePassEmail(@Args('email') email: string): Promise<boolean> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (user == undefined) {
        throw new Error('Wrong email.');
      }

      const JWTpayload = {
        id: user.id,
      };

      const changePassToken = await this.authGqlRedisService.createJWT(
        JWTpayload,
        process.env.EMAIL_JWT_SECRET,
        process.env.EMAIL_JWT_EXP,
      );
      const changePassField = new Map<string, string>([
        ['changepasstoken', changePassToken],
      ]);

      await this.redisHandler.setUser(user.id, changePassField);

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

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation()
  async changePassByToken(
    @Args('changePassByTokenInput') { token, password }: ChangePassByTokenDto,
  ): Promise<boolean> {
    try {
      const { id } = await this.authGqlRedisService.verifyToken(
        token,
        process.env.EMAIL_JWT_SECRET,
      );

      const actualToken = await this.redisHandler.getValue(
        id,
        'changepasstoken',
      );

      if (token === actualToken) {
        await this.usersService.changePasswordByUser(id, password);

        await this.redisHandler.deleteField(id, 'changepasstoken');
        return true;
      } else {
        throw new Error('Link is not valid.');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation()
  @Auth()
  async changePassword(
    @CurrentUser() user: User,
    @Args('password') password: string,
  ): Promise<boolean> {
    try {
      await this.usersService.changePasswordByUser(user.id, password);
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation()
  async logout(@Args('id') id: string): Promise<boolean> {
    try {
      await this.redisHandler.deleteField(id, 'refreshtoken');

      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
