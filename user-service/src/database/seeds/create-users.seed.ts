import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../users/entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().makeMany(10);
  }
}
