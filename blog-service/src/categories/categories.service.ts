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

  findOne(id: number) {
    return this.CategoriesService.findOne(id, { relations: ['posts'] });
  }

  async createCategory(createData: Category): Promise<Category> {
    const category = await this.CategoriesService.save(createData);

    return category;
  }

  async editCategory(editData: Category): Promise<Boolean> {
    try {
      await this.CategoriesService.update(editData.id, {
        name: editData.name,
      });
    } catch (err) {
      throw new Error(err.message);
    }

    return true;
  }
}
