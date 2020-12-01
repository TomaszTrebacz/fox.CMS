import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from 'nestjs-redis';
import { parse } from 'path';
import { userInfoInterface } from './userInfo.interface';

@Injectable()
export class RedisDbService {
  client: Redis;

  constructor(private readonly redisService: RedisService) {
    this.client = this.getRedisClient();
  }

  getRedisClient(): Redis {
    return this.redisService.getClient();
  }

  async saveUser({ id, role, count }: userInfoInterface) {
    await this.client.hmset(
      id,
      new Map([
        ['role', role],
        ['count', count],
      ]),
    );
  }

  async saveToken(id: string, token: string) {
    await this.client.hmset(id, { refreshtoken: token });
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

  async getCount(id: string) {
    let count = await this.client.hget(id, 'count');

    if (!count) {
      throw new UnprocessableEntityException('There is no user with given Id!');
    }

    return parseInt(count);
  }

  async getRole(id: string) {
    const role = await this.client.hget(id, 'role');

    if (!role) {
      throw new UnprocessableEntityException('There is no user with given Id!');
    }

    return role;
  }

  async getToken(id: string) {
    const token = await this.client.hget(id, 'refreshtoken');

    if (!token) {
      throw new UnprocessableEntityException('There is no user with given Id!');
    }

    return token;
  }

  async changeRole({ id, role }: userInfoInterface) {
    await this.client.hmset(id, { role: role });
  }

  async changeCount(id: string, count: string) {
    await this.client.hmset(id, { count: count });
  }

  async deleteKeyField(id: string, key: string) {
    let isRemoved = await this.client.hdel(id, key);

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
