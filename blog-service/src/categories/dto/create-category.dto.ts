import { MinLength, MaxLength, IsEmpty } from 'class-validator';
import { Post } from '../../entities/post.entity';
import { CreateCategoryInput } from '../../graphql';

export class CreateCategoryDto extends CreateCategoryInput {
  @IsEmpty()
  id: number;

  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsEmpty()
  posts: Post[];
}
