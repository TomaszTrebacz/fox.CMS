import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { DateScalar } from './shared/date.scalar';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { CategoriesModule } from './categories/categories.module';
import databaseConfig from './config/database.config';
import redisConfig from './config/redis.config';
import { RedisModule } from 'nestjs-redis';
import { GqlConfigService } from './config/gql.config';
import jwtConfig from './config/jwt.config';
import { AuthGqlRedisModule } from '@tomasztrebacz/nest-auth-graphql-redis';

@Module({
  imports: [
    ConfigModule.forRoot({
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
  providers: [AppService, DateScalar],
})
export class AppModule {}
