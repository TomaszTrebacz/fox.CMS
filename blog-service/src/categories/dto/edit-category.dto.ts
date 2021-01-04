import { MinLength, MaxLength, IsEmpty, IsNumber } from 'class-validator';
import { EditCategoryInput } from '../../graphql';

export class EditCategoryDto extends EditCategoryInput {
  @IsNumber()
  id: number;

  @MinLength(3)
  @MaxLength(20)
  name: string;
}
