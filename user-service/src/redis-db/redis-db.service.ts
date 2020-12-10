import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from 'nestjs-redis';
import { getValueInterface } from './interfaces/getValue.interface';
import { userInfoInterface } from './interfaces/userInfo.interface';

@Injectable()
export class RedisDbService {
  client: Redis;

  constructor(private readonly redisService: RedisService) {
    this.client = this.getRedisClient();
  }

  getRedisClient(): Redis {
    return this.redisService.getClient();
  }

  async saveUser({
    id,
    role,
    confirmed,
    confirmToken,
    count,
  }: userInfoInterface) {
    await this.client.hmset(
      id,
      new Map([
        ['role', role],
        ['count', count],
        ['confirmed', confirmed],
        ['confirmtoken', confirmToken],
      ]),
    );
  }

  async isUserExists(id: string): Promise<boolean> {
    const res = await this.client.exists(id);

    return res === 1 ? true : false;
  }

  async saveToken(id: string, token: string) {
    await this.client.hmset(id, { refreshtoken: token });
  }

  // function for reset password by phone number
  async saveCodeToken(id: string, token: string) {
    await this.client.hmset(id, { codetoken: token });
  }

  // function for change password by email
  async saveEmailToken(id: string, token: string) {
    await this.client.hmset(id, { changepasstoken: token });
  }

  async getUser(id: string) {
    let user = await this.client.hgetall(id);

    if (user === null) {
      throw new UnprocessableEntityException('There is no user with given Id!');
    }

    const data = {
      role: user.role,
      count: parseInt(user.count),
      refreshToken: user.refreshtoken,
      info: user,
    };

    return data;
  }

  async getValue(id: string, key: string) {
    const value = await this.client.hget(id, key);

    if (!value) {
      throw new UnprocessableEntityException('There is no user with given Id!');
    }

    return value;
  }

  async changeRole({ id, role }: userInfoInterface) {
    await this.client.hmset(id, { role: role });
  }

  async changeCount(id: string, count: string) {
    await this.client.hmset(id, { count: count });
  }

  async confirmUser(id: string) {
    await this.client.hmset(id, { confirmed: 'true' });
  }

  async deleteKeyField(id: string, key: string): Promise<Boolean> {
    const isRemoved = await this.client.hdel(id, key);

    if (isRemoved !== 1) {
      throw new UnprocessableEntityException('There is no user with given Id!');
    }

    return new Boolean(true);
  }

  async delete(key: string) {
    if (!key) {
      throw new UnprocessableEntityException('Null key.');
    }

    await this.client.del(key);
  }
}
