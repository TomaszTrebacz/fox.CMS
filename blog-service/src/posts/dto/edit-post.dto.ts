import { Validate, IsNumber, MinLength } from 'class-validator';
import { FieldLength } from 'src/validators/FieldLength.validator';
import { EditPostInput } from '../../graphql';

export class EditPostDto extends EditPostInput {
  @IsNumber()
  id: number;

  @Validate(FieldLength, [3, 50])
  title: string;

  @MinLength(20)
  text: string;
}
