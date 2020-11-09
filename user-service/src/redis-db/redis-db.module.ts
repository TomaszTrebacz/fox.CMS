import { Module } from '@nestjs/common';
import { RedisDbService } from './redis-db.service';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.register({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      db: parseInt(process.env.REDIS_DB),
      password: process.env.REDIS_PASSWORD,
    }),
  ],
  providers: [RedisDbService],
  exports: [RedisDbService],
})
export class RedisDbModule {}
