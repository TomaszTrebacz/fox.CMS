import { PostI } from './post.interface';

export interface CategoryI {
  id: number;
  name: string;
  posts: PostI[];
}
