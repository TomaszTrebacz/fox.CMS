import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../database/entities/category.entity';
import { CategoryI } from '../models/category.interface';
import { isExecuted, isArrayFound, isFound } from '../utils';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryI>,
  ) {}

  async findAll(): Promise<CategoryI[]> {
    const res = await this.categoriesRepository.find({ relations: ['posts'] });

    await isArrayFound(res);

    return res;
  }

  async findOneById(id: number): Promise<CategoryI> {
    const category = await this.categoriesRepository.findOne(id, {
      relations: ['posts'],
    });

    await isFound(category, `Can not find category with id: ${id}`);

    return category;
  }

  async findOneByName(name: string): Promise<CategoryI> {
    const category = await this.categoriesRepository.findOne({ name: name });

    await isFound(category, `Can not find category with name: ${name}`);

    return category;
  }

  async createCategory(
    createData: Pick<CategoryI, 'name'>,
  ): Promise<CategoryI> {
    const category = await this.categoriesRepository.save(createData);

    await isFound(category, 'Can not save in database');

    return category;
  }

  async editCategory({
    id,
    name,
  }: Pick<CategoryI, 'id' | 'name'>): Promise<boolean> {
    const res = await this.categoriesRepository.update(id, {
      name: name,
    });

    await isExecuted(res);

    return true;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const res = await this.categoriesRepository.delete(id);

    await isExecuted(res);

    return true;
  }
}
