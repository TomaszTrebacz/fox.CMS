import { CategoryI } from '../interfaces/category.interface';
import { PostI } from '../interfaces/post.interface';

// util throw error if query does not return any rows
export const isFound = (res: PostI[] | CategoryI[]): void => {
  if (res.length == 0) {
    throw new Error(`Can not find any data.`);
  }
};
