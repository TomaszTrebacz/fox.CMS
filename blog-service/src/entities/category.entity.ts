import { CategoryI } from 'src/interfaces/category.interface';
import {
  Column,
  Entity,
  EntitySchema,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export const CategoryEntity = new EntitySchema<CategoryI>({
  name: 'categories',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
    },
    name: {
      type: String,
      length: 50,
      unique: true,
      nullable: false,
    },
  },
  relations: {
    posts: {
      type: 'one-to-many',
      target: 'posts',
      inverseSide: 'category',
    },
  },
});
