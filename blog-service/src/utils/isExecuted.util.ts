import { UpdateResult } from 'typeorm';

/* 
    typeorm would not throw error by default
    if query didn't actually update or delete row from entity
*/
export const isExecuted = (res: UpdateResult): boolean => {
  if (res.affected !== 1) {
    throw new Error(`Database/ORM error.`);
  }

  return true;
};
