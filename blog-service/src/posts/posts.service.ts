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
}
