import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
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
    const lowercaseEmail = this.authService.lowercaseField(email);

    return this.usersRepository.findOne({ where: { email: lowercaseEmail } });
  }

  async createUser(createData: User): Promise<User> {
    let user = new User();

    user.firstName = createData.firstName;
    user.lastName = createData.lastName;

    user.email = this.authService.lowercaseField(createData.email);
    user.password = this.authService.hashPassword(createData.password);

    await this.usersRepository.save(user);

    return user;
  }

  async updateUser(updateData: User): Promise<Boolean> {
    const currentData = await this.findOneById(updateData.id);

    delete currentData.email;
    delete currentData.password;
    delete currentData.role;

    let finalData = Object.assign(currentData, updateData);
    await this.usersRepository.save(finalData);

    return true;
  }

  async deleteUser(id: string) {
    const deleted = await this.usersRepository.delete(id);

    if (deleted.affected == 1) {
      return true;
    } else {
      throw new Error('The user has not been deleted.');
    }
  }
}
