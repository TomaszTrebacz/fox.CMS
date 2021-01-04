import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { SmsModule } from '../sms/sms.module';
import { phoneNumberExists, emailExists } from '../validators';
import { AuthGqlRedisModule } from '@tomasztrebacz/nest-auth-graphql-redis';
import { UserEntity } from '../database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    MailModule,
    SmsModule,
    AuthGqlRedisModule,
  ],
  providers: [UsersResolver, UsersService, phoneNumberExists, emailExists],
  exports: [UsersService],
})
export class UsersModule {}
