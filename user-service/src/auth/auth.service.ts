import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RedisHandlerService } from '@tomasztrebacz/nest-auth-graphql-redis';
import { comparePassword } from '../utils';
import { ExtendedUserI, UserI } from '../models';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly redisHandler: RedisHandlerService,
  ) {}

  async validateUser({
    email,
    password,
  }: Pick<UserI, 'email' | 'password'>): Promise<UserI> {
    const user = await this.usersService.findOneByEmail(email);

    await comparePassword(password, user.password);

    return user;
  }

  async changeRole({
    id,
    role,
  }: Pick<ExtendedUserI, 'id' | 'role'>): Promise<boolean> {
    const roleField = new Map<string, string>([['role', role]]);

    await this.redisHandler.setUser(id, roleField);

    return true;
  }
}
