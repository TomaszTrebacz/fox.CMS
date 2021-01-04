import { MinLength, MaxLength, IsEmpty } from 'class-validator';
import { CreateCategoryInput } from '../../graphql';

export class CreateCategoryDto extends CreateCategoryInput {
  @MinLength(3)
  @MaxLength(20)
  name: string;
}
