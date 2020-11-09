import {
  IsEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { CreateUserInput } from '../../graphql';
import { userRole } from '../enums/userRole.enum';

export class CreateUserDto extends CreateUserInput {
  @IsEmpty()
  id: string;

  @IsEmail()
  email: string;

  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @MinLength(3)
  @MaxLength(30)
  password: string;

  @IsPhoneNumber('PL')
  phoneNumber: string;

  @IsEmpty()
  created: Date;

  @IsEmpty()
  updated: Date;
}
