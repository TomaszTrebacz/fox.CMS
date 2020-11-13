import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import * as Joi from '@hapi/joi';
import { DateScalar } from './shared/date.scalar';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { CategoriesModule } from './categories/categories.module';
import { RedisDbModule } from './redis-db/redis-db.module';
import databaseConfig from './config/database.config';
import redisConfig from './config/redis.config';
import { RedisModule } from 'nestjs-redis';
import { GqlConfigService } from './config/gql.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, redisConfig],
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
    RedisDbModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
