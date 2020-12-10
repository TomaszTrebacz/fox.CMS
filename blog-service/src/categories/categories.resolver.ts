import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { userRole } from 'src/auth/enums/userRole.enum';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Category } from 'src/entities/category.entity';
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
  @Roles(userRole.ADMIN, userRole.ROOT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async createCategory(
    @Args('createCategoryInput') createData: CreateCategoryDto,
  ): Promise<Category> {
    const createdCategory = await this.categoriesService.createCategory(
      createData,
    );

    return createdCategory;
  }

  @Mutation('editCategory')
  @Roles(userRole.ADMIN, userRole.ROOT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async editCategory(
    @Args('editCategoryInput') editData: EditCategoryDto,
  ): Promise<Boolean> {
    try {
      await this.categoriesService.editCategory(editData);
    } catch (err) {
      throw new Error(`Can not edit category: ${err.message}`);
    }

    return new Boolean(true);
  }

  @Mutation('deleteCategory')
  @Roles(userRole.ADMIN, userRole.ROOT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async deleteCategory(@Args('id') id: number): Promise<Boolean> {
    await this.categoriesService.deleteCategory(id);

    return new Boolean(true);
  }
}
