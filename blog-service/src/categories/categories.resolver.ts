import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Auth, userRole } from '@tomasztrebacz/nest-auth-graphql-redis';
import { CategoryI } from '../models/category.interface';
import { CreateCategoryDto, EditCategoryDto } from './dto';

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query('categories')
  async findAll(): Promise<CategoryI[]> {
    return await this.categoriesService.findAll();
  }

  @Query('category')
  async findOne(@Args('id') id: number): Promise<CategoryI> {
    return await this.categoriesService.findOneById(id);
  }

  @Mutation('createCategory')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async createCategory(
    @Args('createCategoryInput') createData: CreateCategoryDto,
  ): Promise<CategoryI> {
    try {
      const createdCategory = await this.categoriesService.createCategory(
        createData,
      );

      return createdCategory;
    } catch (err) {
      throw Error(`Can not create category: ${err.message}`);
    }
  }

  @Mutation('editCategory')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async editCategory(
    @Args('editCategoryInput') editData: EditCategoryDto,
  ): Promise<boolean> {
    try {
      await this.categoriesService.editCategory(editData);

      return true;
    } catch (err) {
      throw new Error(`Can not edit category: ${err.message}`);
    }
  }

  @Mutation('deleteCategory')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    try {
      await this.categoriesService.deleteCategory(id);

      return true;
    } catch (err) {
      throw new Error(`Can not delete category: ${err.message}`);
    }
  }
}
