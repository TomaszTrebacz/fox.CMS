import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { DateScalar } from './shared';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { CategoriesModule } from './categories/categories.module';
import { RedisModule } from 'nestjs-redis';
import { AuthGqlRedisModule } from '@tomasztrebacz/nest-auth-graphql-redis';

import {
  GqlConfigService,
  databaseConfig,
  jwtConfig,
  redisConfig,
} from './config';
import { categoryExists, FieldLength } from './validators';

// for testing purposes app can manage different env files
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      isGlobal: true,
      load: [databaseConfig, redisConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => config.get('redis'),
      inject: [ConfigService],
    }),
    GraphQLFederationModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    PostsModule,
    CategoriesModule,
    AuthGqlRedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar, FieldLength],
})
export class AppModule {}
