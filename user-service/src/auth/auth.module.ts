import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MailService } from 'src/mail/mail.service';
import { RedisDbModule } from 'src/redis-db/redis-db.module';
import { SmsService } from 'src/sms/sms.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ACCESS_JWT_SECRET'),
        signOptions: { expiresIn: configService.get('ACCESS_JWT_EXP') },
      }),
    }),
    RedisDbModule,
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, MailService, SmsService],
  exports: [AuthService],
})
export class AuthModule {}
