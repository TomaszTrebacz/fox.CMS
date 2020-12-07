import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'phoneNumberExists', async: true })
@Injectable()
export class phoneNumberExists implements ValidatorConstraintInterface {
  constructor(protected readonly usersService: UsersService) {}

  validate(phone: string) {
    return this.usersService.findOneByPhoneNumber(phone).then(user => {
      if (user) return false;
      return true;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property.toUpperCase()} is in use!`;
  }
}
