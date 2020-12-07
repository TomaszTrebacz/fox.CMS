import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { SmsModule } from 'src/sms/sms.module';
import { RedisDbModule } from 'src/redis-db/redis-db.module';
import { phoneNumberExists } from './validators/phoneNumberExists';
import { emailExists } from './validators/emailExists';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    MailModule,
    SmsModule,
    RedisDbModule,
  ],
  providers: [UsersResolver, UsersService, phoneNumberExists, emailExists],
  exports: [UsersService],
})
export class UsersModule {}
