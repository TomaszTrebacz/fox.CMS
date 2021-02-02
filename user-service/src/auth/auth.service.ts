import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RedisHandlerService } from '@tomasztrebacz/nest-auth-graphql-redis';
import { comparePassword, hashPassword, isExecuted } from '../utils';
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
    const user = await this.usersService.findOneByEmail(email, true);

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

  async changePassword(id: string, password: string): Promise<boolean> {
    const updateData = {
      password: await hashPassword(password),
    };

    await this.usersService.updateUser(updateData, id);

    const value = await this.redisHandler.getValue(id, 'count');

    // all values in redis are stored as strings
    let count = parseInt(value, 10);
    count++;

    const countField = new Map<string, string>([['count', count.toString()]]);

    await this.redisHandler.setUser(id, countField);

    return true;
  }
}
