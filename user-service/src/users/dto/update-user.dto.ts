import { IsOptional, Length } from 'class-validator';
import { UpdateUserInput } from '../../graphql';

export class UpdateUserDto extends UpdateUserInput {
  @IsOptional()
  @Length(3, 62)
  firstName: string;

  @IsOptional()
  @Length(6, 62)
  lastName: string;
}
