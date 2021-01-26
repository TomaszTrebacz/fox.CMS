import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MailModule, SmsModule } from '../shared';
import { phoneNumberExists, emailExists } from '../validators';
import { AuthGqlRedisModule } from '@tomasztrebacz/nest-auth-graphql-redis';
import { UserEntity } from '../database/entities/user.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    AuthGqlRedisModule,
    SharedModule,
  ],
  providers: [UsersResolver, UsersService, phoneNumberExists, emailExists],
  exports: [UsersService],
})
export class UsersModule {}
