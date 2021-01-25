import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGqlRedisModule } from '@tomasztrebacz/nest-auth-graphql-redis';
import { postExist } from '../validators';
import { PostEntity } from 'src/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), AuthGqlRedisModule],
  providers: [PostsResolver, PostsService, postExist],
})
export class PostsModule {}
