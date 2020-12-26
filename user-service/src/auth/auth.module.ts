import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { MailService } from '../mail/mail.service';
import { SmsService } from '../sms/sms.service';
import { AuthGqlRedisModule } from '@tomasztrebacz/nest-auth-graphql-redis';

@Module({
  imports: [forwardRef(() => UsersModule), AuthGqlRedisModule],
  providers: [AuthResolver, AuthService, MailService, SmsService],
  exports: [AuthService],
})
export class AuthModule {}
