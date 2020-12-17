import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { AuthGqlRedisModule } from '@tomasztrebacz/nest-auth-graphql-redis';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), AuthGqlRedisModule],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
