import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { AuthGqlRedisModule } from '@tomasztrebacz/nest-auth-graphql-redis';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [forwardRef(() => UsersModule), AuthGqlRedisModule, SharedModule],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
