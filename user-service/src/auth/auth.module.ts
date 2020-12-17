import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MailService } from 'src/mail/mail.service';
import { SmsService } from 'src/sms/sms.service';
import { AuthGqlRedisModule } from '@tomasztrebacz/nest-auth-graphql-redis';

@Module({
  imports: [forwardRef(() => UsersModule), AuthGqlRedisModule],
  providers: [AuthResolver, AuthService, MailService, SmsService],
  exports: [AuthService],
})
export class AuthModule {}
