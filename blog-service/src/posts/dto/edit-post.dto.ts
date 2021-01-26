import { MaxLength, MinLength } from 'class-validator';
import { PostExist } from '../../validators';
import { EditPostInput } from '../../graphql';

export class EditPostDto extends EditPostInput {
  @PostExist()
  id: number;

  @MinLength(10)
  @MaxLength(50)
  title: string;

  @MinLength(10)
  text: string;
}
