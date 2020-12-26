import { IsString, MaxLength, MinLength } from 'class-validator';
import { ChangePassByTokenInput } from '../../graphql';

export class ChangePassByTokenDto extends ChangePassByTokenInput {
  @IsString()
  token: string;

  @MinLength(3)
  @MaxLength(30)
  password: string;
}
