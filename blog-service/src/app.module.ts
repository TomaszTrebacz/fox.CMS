import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { DateScalar } from './shared';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { CategoriesModule } from './categories/categories.module';
import { AuthGqlRedisModule } from '@tomasztrebacz/nest-auth-graphql-redis';
import { GqlConfigService, jwtConfig, redisConfig } from './config';
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
    PostsModule,
    CategoriesModule,
    AuthGqlRedisModule,
    DatabaseModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
