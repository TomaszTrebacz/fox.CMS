import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { postExist } from '../validators';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostsResolver, PostsService, postExist],
})
export class PostsModule {}
