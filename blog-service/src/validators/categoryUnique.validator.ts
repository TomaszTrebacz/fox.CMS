import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoriesService } from '../categories/categories.service';

@ValidatorConstraint({ name: 'categoryUnique', async: true })
@Injectable()
export class categoryUnique implements ValidatorConstraintInterface {
  constructor(protected readonly categoriesService: CategoriesService) {}

  validate(name: string) {
    return this.categoriesService.findOneByName(name).then(category => {
      if (category) return false;
      return true;
    });
  }

  defaultMessage() {
    return 'This name is taken!';
  }
}

export function CategoryUnique(validationOptions?: ValidationOptions) {
  return function(object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: categoryUnique,
    });
  };
}
