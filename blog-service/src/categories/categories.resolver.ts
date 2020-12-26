import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Auth } from '@tomasztrebacz/nest-auth-graphql-redis';
import { userRole } from '../shared/userRole.enum';
import { Category } from '../entities/category.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { EditCategoryDto } from './dto/edit-category.dto';

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query('categories')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query('category')
  findOne(@Args('id') id: number) {
    return this.categoriesService.findOne(id);
  }

  @Mutation('createCategory')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async createCategory(
    @Args('createCategoryInput') createData: CreateCategoryDto,
  ): Promise<Category> {
    const createdCategory = await this.categoriesService.createCategory(
      createData,
    );

    return createdCategory;
  }

  @Mutation('editCategory')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async editCategory(
    @Args('editCategoryInput') editData: EditCategoryDto,
  ): Promise<boolean> {
    try {
      await this.categoriesService.editCategory(editData);
    } catch (err) {
      throw new Error(`Can not edit category: ${err.message}`);
    }

    return true;
  }

  @Mutation('deleteCategory')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    await this.categoriesService.deleteCategory(id);

    return true;
  }
}
