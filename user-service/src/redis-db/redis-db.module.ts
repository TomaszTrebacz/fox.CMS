import { Module } from '@nestjs/common';
import { RedisDbService } from './redis-db.service';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [RedisDbService],
  exports: [RedisDbService],
})
export class RedisDbModule {}
