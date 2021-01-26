import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';

import { GqlConfigService, jwtConfig, redisConfig } from './config';
import { FieldLength } from './validators';
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './database/database.module';

// for testing purposes app can manage different env files
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      isGlobal: true,
      load: [redisConfig, jwtConfig],
    }),
    GraphQLFederationModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    UsersModule,
    AuthModule,
    SharedModule,
    DatabaseModule,
  ],
  providers: [ConfigService, FieldLength],
})
export class AppModule {}
