import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private CategoriesService: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.CategoriesService.find({ relations: ['posts'] });
  }
}
