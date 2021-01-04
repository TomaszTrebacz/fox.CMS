import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { CategoriesService } from 'src/categories/categories.service';

@ValidatorConstraint({ name: 'categoryExists', async: true })
@Injectable()
export class categoryExists implements ValidatorConstraintInterface {
  constructor(protected readonly categoriesService: CategoriesService) {}

  validate(id: number) {
    return this.categoriesService.findOne(id).then(category => {
      if (category) return true;
      return false;
    });
  }

  defaultMessage() {
    return 'Category not exists!';
  }
}
