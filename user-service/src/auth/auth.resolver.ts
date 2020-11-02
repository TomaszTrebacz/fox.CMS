import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.input';
import { AuthenticationError } from 'apollo-server-core';
import { LoginResponse } from '../graphql';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

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
}
