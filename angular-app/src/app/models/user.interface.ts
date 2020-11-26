import { Post } from './post.interface';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  phoneNumber: string;
  created: Date;
  updated: Date;
  role?: string;
  posts?: Post[];
}
