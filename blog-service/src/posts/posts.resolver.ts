import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveProperty,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import {
  CreatePostInput,
  EditPostInput,
  ChangeCategoryPostInput,
} from 'src/graphql';
import { Post } from '../entities/post.entity';
import { PostsService } from './posts.service';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query('posts')
  findAll() {
    return this.postsService.findAll();
  }

  @ResolveProperty('user')
  getUser(@Parent() post: Post) {
    return { __typename: 'User', id: post.userId };
  }

  @Mutation('createPost')
  @UseGuards(AdminGuard)
  async createPost(
    @Args('createPostInput') createData: CreatePostInput,
  ): Promise<Post> {
    const createdPost = await this.postsService.createPost(createData);

    return createdPost;
  }

  @Mutation('editPost')
  @UseGuards(AdminGuard)
  async editPost(
    @Args('editPostInput') editData: EditPostInput,
  ): Promise<Boolean> {
    try {
      await this.postsService.editPost(editData);
    } catch (err) {
      throw new Error(`Can not edit post: ${err.message}`);
    }

    return new Boolean(true);
  }

  @Mutation('changeCategoryPost')
  @UseGuards(AdminGuard)
  async changeCategoryPost(
    @Args('changeCategoryPostInput') changeData: ChangeCategoryPostInput,
  ): Promise<Post> {
    const changedPost = await this.postsService.changeCategoryPost(changeData);

    return changedPost;
  }

  @Mutation('deletePost')
  @UseGuards(AdminGuard)
  async deletePost(@Args('id') id: number): Promise<Boolean> {
    await this.postsService.deletePost(id);

    return new Boolean(true);
  }
}
