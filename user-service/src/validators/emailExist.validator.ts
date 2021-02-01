import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UsersService } from '../users/users.service';

@ValidatorConstraint({ name: 'emailExist', async: true })
@Injectable()
export class emailExist implements ValidatorConstraintInterface {
  constructor(protected readonly usersService: UsersService) {}

  validate(email: string) {
    return this.usersService.findOneByEmail(email, false).then(user => {
      if (user) return false;
      return true;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property.toUpperCase()} is in use!`;
  }
}

export function EmailExist(validationOptions?: ValidationOptions) {
  return function(object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: emailExist,
    });
  };
}
