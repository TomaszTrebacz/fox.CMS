import { MinLength, MaxLength, IsEmpty, IsNumber } from 'class-validator';
import { ChangeCategoryPostInput } from '../../graphql';

export class CreatePostDto extends ChangeCategoryPostInput {
  @IsNumber()
  id: number;

  @IsNumber()
  category: number;
}
