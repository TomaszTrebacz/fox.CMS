import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from 'nestjs-redis';
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

  async saveUser({ id, role }: userInfoInterface) {
    await this.client.hmset(id, new Map([['role', role]]));
  }

  async getRole(id: string) {
    const role = await this.client.hget(id, 'role');

    if (!role) {
      throw new UnprocessableEntityException('Invalid key or null value');
    }

    return role;
  }

  async changeRole({ id, role }: userInfoInterface) {
    await this.client.hmset(id, { role: role });
  }

  async delete(key: string) {
    if (!key) {
      throw new UnprocessableEntityException('Null key.');
    }

    await this.client.del(key);
  }
}
