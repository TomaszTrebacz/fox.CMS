import { MinLength, MaxLength } from 'class-validator';
import { CategoryExist, CategoryUnique } from '../../validators';
import { EditCategoryInput } from '../../graphql';

export class EditCategoryDto extends EditCategoryInput {
  @CategoryExist()
  id: number;

  @MinLength(3)
  @MaxLength(20)
  @CategoryUnique()
  name: string;
}
