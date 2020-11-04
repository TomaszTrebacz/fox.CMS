import { MinLength, MaxLength, IsEmpty, IsNumber } from 'class-validator';
import { Post } from 'src/entities/post.entity';
import { EditCategoryInput } from '../../graphql';

export class EditCategoryDto extends EditCategoryInput {
  @IsNumber()
  id: number;

  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsEmpty()
  posts: Post[];
}
