import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { Fragment } from 'src/utils/fragment.type';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private CategoriesService: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.CategoriesService.find({ relations: ['posts'] });
  }

  async findOne(id: number): Promise<Category> {
    return await this.CategoriesService.findOne(id, { relations: ['posts'] });
  }

  async createCategory(
    createData: Fragment<Category, 'name'>,
  ): Promise<Category> {
    try {
      const category = await this.CategoriesService.save(createData);
      return category;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async editCategory(
    editData: Fragment<Category, 'id' | 'name'>,
  ): Promise<boolean> {
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
