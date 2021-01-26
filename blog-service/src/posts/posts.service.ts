import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { PostI } from '../models/post.interface';
import { isExecuted, isFound } from '../utils';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private PostsRepository: Repository<PostI>,
  ) {}

  async findAll(): Promise<PostI[]> {
    const res = await this.PostsRepository.find({
      relations: ['category'],
    });

    await isFound(res);

    return res;
  }

  async findOne(id: number): Promise<PostI> {
    return await this.PostsRepository.findOneOrFail(id, {
      relations: ['category'],
    });
  }

  async findUserPosts(id: string): Promise<PostI[]> {
    const res = await this.PostsRepository.find({ userId: id });

    await isFound(res);

    return res;
  }

  async createPost(
    createData: Pick<PostI, 'title' | 'text' | 'category' | 'imageUrl'>,
  ): Promise<PostI> {
    const { id } = await this.PostsRepository.save(createData);

    const postWithCategory = await this.PostsRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });

    return postWithCategory;
  }

  async editPost({
    id,
    title,
    text,
  }: Pick<PostI, 'id' | 'title' | 'text'>): Promise<boolean> {
    const res = await this.PostsRepository.update(id, {
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
    return await this.PostsRepository.save({
      id: id,
      category: category,
    });
  }

  async deletePost(id: number): Promise<boolean> {
    const res = await this.PostsRepository.delete(id);

    await isExecuted(res);

    return true;
  }

  async deleteUserPosts(id: string): Promise<boolean> {
    const res = await this.PostsRepository.delete({ userId: id });

    await isExecuted(res);

    return true;
  }
}
