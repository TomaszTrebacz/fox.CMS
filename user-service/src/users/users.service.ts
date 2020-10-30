import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string) {
    const lowercaseEmail = this.lowercaseField(email);

    return this.usersRepository.find({ where: { email: lowercaseEmail } });
  }

  async createUser(createData: User): Promise<User> {
    let user = new User();

    user.firstName = createData.firstName;
    user.lastName = createData.lastName;

    user.email = this.lowercaseField(createData.email);
    user.password = this.hashPassword(createData.password);

    await this.usersRepository.save(user);

    return user;
  }

  lowercaseField(field: String) {
    return field.toLowerCase();
  }

  hashPassword(password: String) {
    const saltRounds = parseInt(process.env.SALT_LENGTH);
    const hash = bcrypt.hashSync(password, saltRounds);

    return hash;
  }
}
