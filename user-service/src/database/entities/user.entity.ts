import { User } from 'src/interfaces/user.interface';
import { EntitySchema } from 'typeorm';

export const UserEntity = new EntitySchema<User>({
  name: 'users',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    email: {
      type: String,
      length: 50,
      unique: true,
    },
    firstName: {
      type: String,
      nullable: false,
      length: 50,
    },
    lastName: {
      type: String,
      nullable: false,
      length: 50,
    },
    password: {
      type: String,
      nullable: false,
      length: 128,
    },
    phoneNumber: {
      type: String,
      nullable: false,
      length: 50,
    },
    created: {
      type: Date,
      createDate: true,
      nullable: false,
    },
    updated: {
      type: Date,
      updateDate: true,
      nullable: true,
    },
  },
});
