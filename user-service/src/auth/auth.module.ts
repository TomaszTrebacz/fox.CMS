import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { MailService, SmsService } from '../shared';
import { AuthGqlRedisModule } from '@tomasztrebacz/nest-auth-graphql-redis';

@Module({
  imports: [forwardRef(() => UsersModule), AuthGqlRedisModule],
  providers: [AuthResolver, AuthService, MailService, SmsService],
  exports: [AuthService],
})
export class AuthModule {}
