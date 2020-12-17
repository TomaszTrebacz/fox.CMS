import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveProperty,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import {
  GqlAuthGuard,
  RolesGuard,
  Roles,
} from '@tomasztrebacz/nest-auth-graphql-redis';
import { userRole } from 'src/shared/userRole.enum';
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
  async findAll() {
    return this.postsService.findAll();
  }

  @ResolveProperty('user')
  getUser(@Parent() post: Post) {
    return { __typename: 'User', id: post.userId };
  }

  @Mutation('createPost')
  @Roles(userRole.ADMIN, userRole.ROOT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async createPost(
    @Args('createPostInput') createData: CreatePostInput,
  ): Promise<Post> {
    const createdPost = await this.postsService.createPost(createData);

    return createdPost;
  }

  @Mutation('editPost')
  @Roles(userRole.ADMIN, userRole.ROOT)
  @UseGuards(GqlAuthGuard, RolesGuard)
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
  @Roles(userRole.ADMIN, userRole.ROOT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async changeCategoryPost(
    @Args('changeCategoryPostInput') changeData: ChangeCategoryPostInput,
  ): Promise<Post> {
    const changedPost = await this.postsService.changeCategoryPost(changeData);

    return changedPost;
  }

  @Mutation('deletePost')
  @Roles(userRole.ADMIN, userRole.ROOT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async deletePost(@Args('id') id: number): Promise<Boolean> {
    await this.postsService.deletePost(id);

    return new Boolean(true);
  }
}
