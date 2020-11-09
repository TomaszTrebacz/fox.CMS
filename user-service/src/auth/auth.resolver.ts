import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.input';
import { AuthenticationError } from 'apollo-server-core';
import { LoginResponse } from '../graphql';
import { RootGuard } from './guards/root.guard';
import { ChangeRoleDto } from 'src/auth/dto/change-role.dto';
import { UsersService } from 'src/users/users.service';
import { UseGuards } from '@nestjs/common';
import { UserInputError } from 'apollo-server-core';
import { MailService } from 'src/mail/mail.service';
import * as generator from 'generate-password';
import { RedisDbService } from 'src/redis-db/redis-db.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly redisService: RedisDbService,
  ) {}

  @Query('login')
  async login(@Args('loginCredentials') loginCredentials: LoginDto) {
    const user = await this.authService.validateUser(loginCredentials);
    const role = await this.redisService.getRole(user.id);

    const token = await this.authService.createJwt(user, role);

    const loginResponse = new LoginResponse();
    loginResponse.user = user;
    loginResponse.token = token;

    return loginResponse;
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
  async resetPassword(@Args('email') email: string): Promise<Boolean> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (user == undefined)
        throw new UserInputError('The user does not exist');

      const password = generator.generate({
        length: 8,
        numbers: true,
      });

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
}
