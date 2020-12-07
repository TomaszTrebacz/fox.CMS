import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'emailExists', async: true })
@Injectable()
export class emailExists implements ValidatorConstraintInterface {
  constructor(protected readonly usersService: UsersService) {}

  validate(email: string) {
    return this.usersService.findOneByEmail(email).then(user => {
      if (user) return false;
      return true;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property.toUpperCase()} is in use!`;
  }
}
