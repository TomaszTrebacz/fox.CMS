import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UsersService } from '../users/users.service';

@ValidatorConstraint({ name: 'phoneNumberExist', async: true })
@Injectable()
export class phoneNumberExist implements ValidatorConstraintInterface {
  constructor(protected readonly usersService: UsersService) {}

  validate(phone: string) {
    return this.usersService.findOneByPhoneNumber(phone, false).then(user => {
      if (user) return false;
      return true;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property.toUpperCase()} is in use!`;
  }
}

export function PhoneNumberExist(validationOptions?: ValidationOptions) {
  return function(object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: phoneNumberExist,
    });
  };
}
