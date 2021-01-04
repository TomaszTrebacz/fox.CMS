import { IsEmpty, IsOptional, IsMobilePhone, Validate } from 'class-validator';
import { UpdateUserInput } from '../../graphql';
import { FieldLength } from '../../validators';

export class UpdateUserDto extends UpdateUserInput {
  @IsOptional()
  @Validate(FieldLength, [3, 62])
  firstName: string;

  @IsOptional()
  @Validate(FieldLength, [6, 62])
  lastName: string;
}
