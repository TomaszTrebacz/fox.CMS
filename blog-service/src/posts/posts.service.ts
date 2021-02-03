import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../database/entities/post.entity';
import { PostI } from '../models/post.interface';
import { isExecuted, isArrayFound, isFound } from '../utils';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostI>,
  ) {}

  async findAll(): Promise<PostI[]> {
    const res = await this.postsRepository.find({
      relations: ['category'],
    });

    await isArrayFound(res);

    return res;
  }

  async findOne(id: number): Promise<PostI> {
    return await this.postsRepository.findOneOrFail(id, {
      relations: ['category'],
    });
  }

  async findUserPosts(id: string): Promise<PostI[]> {
    const res = await this.postsRepository.find({ userId: id });

    await isArrayFound(res);

    return res;
  }

  async createPost(
    createData: Pick<PostI, 'title' | 'text' | 'category' | 'imageUrl'>,
  ): Promise<PostI> {
    const post = await this.postsRepository.save(createData);

    await isFound(post, 'Can not create post');

    const postWithCategory = await this.postsRepository.findOne({
      where: { id: post.id },
      relations: ['category'],
    });

    return postWithCategory;
  }

  async editPost({
    id,
    title,
    text,
  }: Pick<PostI, 'id' | 'title' | 'text'>): Promise<boolean> {
    const res = await this.postsRepository.update(id, {
      title: title,
      text: text,
    });

    await isExecuted(res);

    return true;
  }

  async changeCategoryPost({
    id,
    category,
  }: Pick<PostI, 'id' | 'category'>): Promise<PostI> {
    const updatedPost = await this.postsRepository.save({
      id: id,
      category: category,
    });

    await isFound(updatedPost, 'Can not update post');

    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    const res = await this.postsRepository.delete(id);

    await isExecuted(res);

    return true;
  }

  async deleteUserPosts(id: string): Promise<boolean> {
    const res = await this.postsRepository.delete({ userId: id });

    await isExecuted(res);

    return true;
  }
}
