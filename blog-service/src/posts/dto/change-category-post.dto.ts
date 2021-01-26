import { CategoryExist } from '../../validators';
import { ChangeCategoryPostInput } from '../../graphql';

export class ChangeCategoryPostDto extends ChangeCategoryPostInput {
  @CategoryExist()
  id: number;

  @CategoryExist()
  category: number;
}
