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

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Query('login')
  async login(@Args('loginCredentials') loginCredentials: LoginDto) {
    const user = await this.authService.validateUser(loginCredentials);
    if (!user) {
      throw new AuthenticationError('Wrong e-mail or password.');
    }

    const token = await this.authService.createJwt(user);

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
    const user = await this.usersService.changeRole(changeRoleData);

    if (!user) throw new UserInputError('The user does not exist');

    return true;
  }
}
