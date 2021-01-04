import { IsEmpty, IsEmail, IsMobilePhone, Validate } from 'class-validator';
import { emailExists, FieldLength, phoneNumberExists } from 'src/validators';
import { CreateUserInput } from '../../graphql';

export class CreateUserDto extends CreateUserInput {
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
}
