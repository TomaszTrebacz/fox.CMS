import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import {
  Auth,
  CurrentUser,
  userRole,
} from '@tomasztrebacz/nest-auth-graphql-redis';
import { User } from '../graphql';
import { PostsService } from './posts.service';
import { PostI } from '../models/post.interface';
import { ChangeCategoryPostDto, CreatePostDto, EditPostDto } from './dto';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query('posts')
  async findAll(): Promise<PostI[]> {
    return await this.postsService.findAll();
  }

  @Query('post')
  async findOne(@Args('id') id: number): Promise<PostI> {
    return await this.postsService.findOne(id);
  }

  @Query('userPosts')
  async findUserPosts(@Args('id') id: string): Promise<PostI[]> {
    return await this.postsService.findUserPosts(id);
  }

  @ResolveField('user')
  getUser(@Parent() post: PostI) {
    return { __typename: 'User', id: post.userId };
  }

  @Auth(userRole.ADMIN, userRole.ROOT)
  @Mutation('createPost')
  async createPost(
    @CurrentUser() user: User,
    @Args('createPostInput') createData: CreatePostDto,
  ): Promise<PostI> {
    try {
      const data = {
        ...createData,
        userId: user.id,
      };

      const createdPost = await this.postsService.createPost(data);

      return createdPost;
    } catch (err) {
      throw new Error(`Can not create post: ${err.message}`);
    }
  }

  @Mutation('editPost')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async editPost(
    @Args('editPostInput') editData: EditPostDto,
  ): Promise<boolean> {
    try {
      await this.postsService.editPost(editData);
    } catch (err) {
      throw new Error(`Can not edit post: ${err.message}`);
    }

    return true;
  }

  @Mutation('changeCategoryPost')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async changeCategoryPost(
    @Args('changeCategoryPostInput') changeData: ChangeCategoryPostDto,
  ): Promise<boolean> {
    try {
      await this.postsService.changeCategoryPost(changeData);

      return true;
    } catch (err) {
      throw new Error(`Can not change category: ${err.message}`);
    }
  }

  @Mutation('deletePost')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async deletePost(@Args('id') id: number): Promise<boolean> {
    try {
      await this.postsService.deletePost(id);

      return true;
    } catch (err) {
      throw new Error(`Can not delete post: ${err.message}`);
    }
  }

  @Mutation('deleteUserPosts')
  async deleteUserPosts(@Args('id') id: string): Promise<boolean> {
    try {
      await this.postsService.deleteUserPosts(id);

      return true;
    } catch (err) {
      throw new Error(
        `Can not delete posts related to user with id - ${id}: ${err.message}`,
      );
    }
  }
}
