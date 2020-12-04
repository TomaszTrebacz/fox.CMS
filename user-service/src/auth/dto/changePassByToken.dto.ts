import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ChangePassByTokenInput } from 'src/graphql';

export class ChangePassByTokenDto extends ChangePassByTokenInput {
  @IsString()
  token: string;

  @MinLength(3)
  @MaxLength(30)
  password: string;
}
