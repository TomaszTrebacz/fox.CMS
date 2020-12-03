import { IsMobilePhone, IsNumber } from 'class-validator';
import { ResetPasswordInput } from '../../graphql';

export class ResetPasswordDto extends ResetPasswordInput {
  @IsMobilePhone()
  phoneNumber: string;

  @IsNumber()
  code: number;
}
