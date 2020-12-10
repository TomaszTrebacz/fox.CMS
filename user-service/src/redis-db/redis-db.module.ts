import { Global, Module } from '@nestjs/common';
import { RedisDbService } from './redis-db.service';

@Global()
@Module({
  providers: [RedisDbService],
  exports: [RedisDbService],
})
export class RedisDbModule {}
