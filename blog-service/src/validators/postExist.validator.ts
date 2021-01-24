import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { PostsService } from '../posts/posts.service';

@ValidatorConstraint({ name: 'postExist', async: true })
@Injectable()
export class postExist implements ValidatorConstraintInterface {
  constructor(protected readonly postsService: PostsService) {}

  validate(id: number) {
    return this.postsService.findOne(id).then(post => {
      if (post) return true;
      return false;
    });
  }

  defaultMessage() {
    return 'Post does not exist!';
  }
}

export function PostExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: postExist,
    });
  };
}
