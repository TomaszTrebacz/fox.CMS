import { DeleteResult, UpdateResult } from 'typeorm';

/* 
    typeorm does not throw error
    if query does not actually update or delete row from entity
*/
export const isExecuted = (res: UpdateResult | DeleteResult): boolean => {
  if (res.affected !== 1) {
    throw new Error(`Database/ORM error.`);
  }

  return true;
};
