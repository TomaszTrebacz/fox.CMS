import { DeleteResult, UpdateResult } from 'typeorm';
import { UserI } from '../models';

/* 
    typeorm does not throw error
    if query does not actually update or delete row from entity
*/
export const isExecuted = (
  res: UpdateResult | DeleteResult | undefined,
): void => {
  if (res.affected !== 1) {
    throw new Error('Database/ORM error.');
  }
};

// util throw error if query does not return any rows
export const isArrayFound = (res: UserI[] | undefined): void => {
  if (!res || res.length == 0) {
    throw new Error('Can not find any data.');
  }
};

// util throw error if query does not return any row(s)
export const isFound = (res: UserI | undefined, message: string): void => {
  if (!res) {
    throw new Error(message);
  }
};
