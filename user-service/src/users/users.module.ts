import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { SmsModule } from 'src/sms/sms.module';
import { phoneNumberExists } from './validators/phoneNumberExists';
import { emailExists } from './validators/emailExists';
import { AuthGqlRedisModule } from '@tomasztrebacz/nest-auth-graphql-redis';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    MailModule,
    SmsModule,
    AuthGqlRedisModule,
  ],
  providers: [UsersResolver, UsersService, phoneNumberExists, emailExists],
  exports: [UsersService],
})
export class UsersModule {}
