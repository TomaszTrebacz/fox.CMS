import {
  IsEmpty,
  MinLength,
  MaxLength,
  IsUUID,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { UpdateUserInput } from '../../graphql';
import { userRole } from '../enums/userRole.enum';

export class UpdateUserDto extends UpdateUserInput {
  @IsEmpty()
  id: string;

  @IsEmpty()
  email: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @IsEmpty()
  password: string;

  @IsPhoneNumber('PL')
  phoneNumber: string;

  @IsEmpty()
  created: Date;

  @IsEmpty()
  updated: Date;
}
