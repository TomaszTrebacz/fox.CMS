import { IsEmpty, IsOptional, IsMobilePhone, Validate } from 'class-validator';
import { UpdateUserInput } from '../../graphql';
import { FieldLength } from '../validators/FieldLength';
import { phoneNumberExists } from '../validators/phoneNumberExists';

export class UpdateUserDto extends UpdateUserInput {
  @IsEmpty()
  id: string;

  @IsEmpty()
  email: string;

  @IsOptional()
  @Validate(FieldLength, [6, 62])
  firstName: string;

  @IsOptional()
  @Validate(FieldLength, [6, 62])
  lastName: string;

  @IsEmpty()
  password: string;

  @IsMobilePhone()
  @Validate(phoneNumberExists)
  phoneNumber: string;

  @IsEmpty()
  created: Date;

  @IsEmpty()
  updated: Date;
}
