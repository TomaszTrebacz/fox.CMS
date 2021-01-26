import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { CategoryEntity } from '../entities/category.entity';
import { categoryExist, categoryUnique } from '../validators';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [
    CategoriesResolver,
    CategoriesService,
    categoryExist,
    categoryUnique,
  ],
})
export class CategoriesModule {}
