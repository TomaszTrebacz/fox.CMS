import {
  IsEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { CreateUserInput } from '../../graphql';
import { emailExists } from '../validators/emailExists';
import { FieldLength } from '../validators/FieldLength';
import { phoneNumberExists } from '../validators/phoneNumberExists';

export class CreateUserDto extends CreateUserInput {
  @IsEmpty()
  id: string;

  @IsEmail()
  @Validate(FieldLength, [6, 62])
  @Validate(emailExists)
  email: string;

  @Validate(FieldLength, [2, 50])
  firstName: string;

  @Validate(FieldLength, [6, 50])
  lastName: string;

  @Validate(FieldLength, [8, 128])
  password: string;

  @IsMobilePhone()
  @Validate(phoneNumberExists)
  phoneNumber: string;

  @IsEmpty()
  created: Date;

  @IsEmpty()
  updated: Date;
}
