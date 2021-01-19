import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private PostsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.PostsRepository.find({
      relations: ['category'],
      skip: 2,
      take: 5,
    });
  }

  findOne(id: number): Promise<Post> {
    return this.PostsRepository.findOneOrFail(id, { relations: ['category'] });
  }

  findUserPosts(id: string): Promise<Post[]> {
    return this.PostsRepository.find({ where: { userId: id } });
  }

  async createPost(createData): Promise<Post> {
    const post = await this.PostsRepository.save(createData);

    const productWithCategory = await this.PostsRepository.findOne({
      where: { id: post.id },
      relations: ['category'],
    });

    return productWithCategory;
  }

  async editPost(updateData): Promise<boolean> {
    try {
      await this.PostsRepository.update(updateData.id, {
        title: updateData.title,
        text: updateData.text,
      });

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async changeCategoryPost(changeData): Promise<Post> {
    try {
      await this.PostsRepository.update(changeData.id, {
        category: changeData.category,
      });

      const productWithCategory = await this.PostsRepository.findOne({
        where: { id: changeData.id },
        relations: ['category'],
      });

      return productWithCategory;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deletePost(id: number): Promise<boolean> {
    try {
      const post = await this.PostsRepository.findOne(id);

      if (!post) {
        throw new Error('There are no post with given id');
      }

      await this.PostsRepository.delete(id);

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteUserPosts(id: string): Promise<boolean> {
    try {
      await this.PostsRepository.delete({ userId: id });

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
