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
}
