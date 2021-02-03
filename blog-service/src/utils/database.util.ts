import { DeleteResult, UpdateResult } from 'typeorm';
import { CategoryI } from '../models/category.interface';
import { PostI } from '../models/post.interface';

/* 
    typeorm does not throw error
    if query does not actually update or delete row from entity
*/
export const isExecuted = (res: UpdateResult | DeleteResult): void => {
  if (res.affected !== 1) {
    throw new Error(`Database/ORM error.`);
  }
};

// util throw error if query does not return any rows
export const isArrayFound = (res: PostI[] | CategoryI[] | undefined): void => {
  if (!res || res.length == 0) {
    throw new Error(`Can not find any data.`);
  }
};

export const isFound = (
  res: PostI | CategoryI | undefined,
  message: string,
): void => {
  if (!res) {
    throw new Error(message);
  }
};
