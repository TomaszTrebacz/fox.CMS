import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoriesService } from 'src/categories/categories.service';

@ValidatorConstraint({ name: 'categoryExist', async: true })
@Injectable()
export class categoryExist implements ValidatorConstraintInterface {
  constructor(protected readonly categoriesService: CategoriesService) {}

  validate(id: number) {
    return this.categoriesService.findOne(id).then(category => {
      if (category) return true;
      return false;
    });
  }

  defaultMessage() {
    return 'Category does not exist!';
  }
}

export function CategoryExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: categoryExist,
    });
  };
}
