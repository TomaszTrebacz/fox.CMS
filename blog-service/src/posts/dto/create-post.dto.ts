import { IsUrl, IsUUID, Validate } from 'class-validator';
import { categoryExists } from 'src/validators/categoryExists.validator';
import { FieldLength } from 'src/validators/FieldLength.validator';
import { CreatePostInput } from '../../graphql';

export class CreatePostDto extends CreatePostInput {
  @Validate(FieldLength, [3, 50])
  title: string;

  @Validate(FieldLength, [10])
  text: string;

  @Validate(categoryExists)
  category: number;

  @IsUrl()
  imageUrl: string;
}
