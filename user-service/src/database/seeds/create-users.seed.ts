import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().makeMany(10);
  }
}
