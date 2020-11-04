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
    return this.PostsRepository.find({ relations: ['category'] });
  }

  async createPost(createData: object): Promise<Post> {
    const post = await this.PostsRepository.save(createData);

    const productWithCategory = await this.PostsRepository.findOne({
      where: { id: post.id },
      relations: ['category'],
    });

    return productWithCategory;
  }

  async editPost(updateData): Promise<Boolean> {
    try {
      await this.PostsRepository.update(updateData.id, {
        title: updateData.title,
        text: updateData.text,
      });
    } catch (err) {
      throw new Error(err.message);
    }

    return true;
  }
}
