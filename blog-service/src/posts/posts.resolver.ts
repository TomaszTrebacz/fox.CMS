import {
  Resolver,
  Query,
  ResolveProperty,
  Parent,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { Auth, CurrentUser } from '@tomasztrebacz/nest-auth-graphql-redis';
import { userRole } from '../enums';
import { ChangeCategoryPostInput, User } from '../graphql';
import { Post } from '../entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query('posts')
  async findAll() {
    return this.postsService.findAll();
  }

  @Query('post')
  async findOne(@Args('id') id: number): Promise<Post> {
    return this.postsService.findOne(id);
  }

  @Query('userPosts')
  async findUserPosts(@Args('id') id: string): Promise<Post[]> {
    return this.postsService.findUserPosts(id);
  }

  @ResolveProperty('user')
  getUser(@Parent() post: Post) {
    return { __typename: 'User', id: post.userId };
  }

  @Auth(userRole.ADMIN, userRole.ROOT)
  @Mutation('createPost')
  async createPost(
    @CurrentUser() user: User,
    @Args('createPostInput') createData: CreatePostDto,
  ): Promise<Post> {
    const data = {
      ...createData,
      userId: user.id,
    };

    const createdPost = await this.postsService.createPost(data);

    return createdPost;
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
    @Args('changeCategoryPostInput') changeData: ChangeCategoryPostInput,
  ): Promise<Post> {
    const changedPost = await this.postsService.changeCategoryPost(changeData);

    return changedPost;
  }

  @Mutation('deletePost')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async deletePost(@Args('id') id: number): Promise<boolean> {
    await this.postsService.deletePost(id);

    return true;
  }

  @Mutation('deleteUserPosts')
  async deleteUserPosts(@Args('id') id: string): Promise<boolean> {
    await this.postsService.deleteUserPosts(id);

    return true;
  }
}
