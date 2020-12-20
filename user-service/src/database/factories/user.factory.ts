import * as Faker from 'faker';
import { User } from '../entities/user.entity';
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker) => {
  const user = new User();

  user.email = faker.internet.email();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.password = faker.internet.password();

  return user;
});
