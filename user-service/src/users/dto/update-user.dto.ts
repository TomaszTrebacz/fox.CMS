import {
  IsEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsMobilePhone,
} from 'class-validator';
import { UpdateUserInput } from '../../graphql';

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

  @IsMobilePhone()
  phoneNumber: string;

  @IsEmpty()
  created: Date;

  @IsEmpty()
  updated: Date;
}
