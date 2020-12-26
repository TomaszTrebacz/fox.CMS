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
    try {
      const category = await this.CategoriesService.save(createData);
      return category;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async editCategory(editData: Category): Promise<boolean> {
    try {
      await this.CategoriesService.update(editData.id, {
        name: editData.name,
      });
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteCategory(id: number): Promise<boolean> {
    try {
      const category = await this.CategoriesService.findOne(id);

      if (!category) {
        throw new Error('There are no category with given id');
      }

      await this.CategoriesService.delete(id);

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
