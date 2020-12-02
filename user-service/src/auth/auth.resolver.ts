import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.input';
import { AuthenticationError } from 'apollo-server-core';
import { RootGuard } from './guards/root.guard';
import { ChangeRoleDto } from 'src/auth/dto/change-role.dto';
import { UsersService } from 'src/users/users.service';
import { UseGuards } from '@nestjs/common';
import { UserInputError } from 'apollo-server-core';
import { MailService } from 'src/mail/mail.service';
import * as generator from 'generate-password';
import { RedisDbService } from 'src/redis-db/redis-db.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtService } from '@nestjs/jwt';
var jwt = require('jsonwebtoken');

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly redisService: RedisDbService,
    private readonly jwtService: JwtService,
  ) {}

  @Query('login')
  async login(@Args('loginCredentials') loginCredentials: LoginDto) {
    const user = await this.authService.validateUser(loginCredentials);

    const rdsUser = await this.redisService.getUser(user.id);

    const accessToken = await this.authService.createAccessJwt(
      user.id,
      rdsUser.role,
    );

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
          user.role,
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
  @UseGuards(RootGuard)
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

      const redisData = {
        id: id,
        key: 'confirmtoken',
      };

      const actualToken = await this.redisService.getValue(redisData);

      if (confirmToken == actualToken) {
        await this.redisService.confirmUser(id);

        await this.redisService.deleteKeyField(redisData);
      } else {
        throw new Error('Please check your email. Token is not valid.');
      }

      return true;
    } catch (err) {
      throw new Error(`Can not confirm user: ${err.message}`);
    }
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async resetPassword(@Args('email') email: string): Promise<Boolean> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (user == undefined)
        throw new UserInputError('The user does not exist');

      const password = generator.generate({
        length: 8,
        numbers: true,
      });

      const redisData = {
        id: user.id,
        key: 'count',
      };
      const value = await this.redisService.getValue(redisData);
      // all values in redis are stored as strings
      let count = parseInt(value, 10);
      count++;

      await this.redisService.changeCount(user.id, count.toString());

      await this.usersService.changePassword(user.id, password);

      const mail = {
        greeting: `Hi ${user.firstName} ${user.lastName}!`,
        content: `Your new password is ${password}`,
        subject: `Forger password for user ${user.firstName} ${user.lastName}`,
        mailAddress: user.email,
      };

      this.mailService.sendMail(mail);

      return new Boolean(true);
    } catch (err) {
      throw new Error(
        `Can not reset password and send email with new one: ${err.message}`,
      );
    }
  }

  @Mutation()
  async logout(@Args('id') id: string): Promise<Boolean> {
    try {
      const redisData = {
        id: id,
        key: 'refreshtoken',
      };

      await this.redisService.deleteKeyField(redisData);
      return new Boolean(true);
    } catch (err) {
      throw new Error(err);
    }
  }
}
