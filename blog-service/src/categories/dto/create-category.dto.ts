import { MinLength, MaxLength } from 'class-validator';
import { CategoryUnique } from '../../validators';
import { CreateCategoryInput } from '../../graphql';

export class CreateCategoryDto extends CreateCategoryInput {
  @MinLength(3)
  @MaxLength(20)
  @CategoryUnique()
  name: string;
}
