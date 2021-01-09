import { Post } from './post.interface';

export interface Category {
  id: number;
  name: string;
  posts?: Post[];
}
