import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryI } from '../interfaces/category.interface';
import { isExecuted, isFound } from '../utils';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private CategoriesService: Repository<CategoryI>,
  ) {}

  async findAll(): Promise<CategoryI[]> {
    const res = await this.CategoriesService.find({ relations: ['posts'] });

    await isFound(res);

    return res;
  }

  async findOneById(id: number): Promise<CategoryI> {
    return await this.CategoriesService.findOneOrFail(id, {
      relations: ['posts'],
    });
  }

  async findOneByName(name: string): Promise<CategoryI> {
    return await this.CategoriesService.findOne({ name: name });
  }

  async createCategory(
    createData: Pick<CategoryI, 'name'>,
  ): Promise<CategoryI> {
    return await this.CategoriesService.save(createData);
  }

  async editCategory({
    id,
    name,
  }: Pick<CategoryI, 'id' | 'name'>): Promise<boolean> {
    const res = await this.CategoriesService.update(id, {
      name: name,
    });

    await isExecuted(res);

    return true;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const res = await this.CategoriesService.delete(id);

    await isExecuted(res);

    return true;
  }
}
