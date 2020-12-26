import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { LoginInput } from '../../graphql';

export class LoginDto extends LoginInput {
  @IsEmail()
  email: string;

  @MinLength(3)
  @MaxLength(30)
  password: string;
}
