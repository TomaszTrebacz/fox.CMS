import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class RedisDbService {
  client: Redis;

  constructor(private readonly redisService: RedisService) {
    this.client = this.getRedisClient();
  }

  getRedisClient(): Redis {
    return this.redisService.getClient();
  }

  async getUser(id: string) {
    const role = await this.client.hget(id, 'role');

    if (!role) {
      throw new UnprocessableEntityException('No user in database!');
    }

    return role;
  }

  async isUserExists(id: string): Promise<boolean> {
    const res = await this.client.exists(id);

    return res === 1 ? true : false;
  }

  async getValue(id: string, key: string) {
    const value = await this.client.hget(id, key);

    if (!value) {
      throw new UnprocessableEntityException('There is no user with given Id!');
    }

    return value;
  }
}
