import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { RedisHandlerService } from '@tomasztrebacz/nest-auth-graphql-redis';
import { comparePassword, hashPassword } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private redisHandler: RedisHandlerService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string) {
    const lowercaseEmail = this.authService.lowercaseField(email);

    return this.usersRepository.findOne({
      where: { email: lowercaseEmail },
    });
  }

  findOneByPhoneNumber(phoneNumber: string) {
    return this.usersRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
  }

  async createUser(createData: User): Promise<User> {
    const user = new User();

    user.firstName = createData.firstName;
    user.lastName = createData.lastName;
    user.phoneNumber = createData.phoneNumber;

    user.email = this.authService.lowercaseField(createData.email);
    user.password = await hashPassword(createData.password);

    await this.usersRepository.save(user);

    return user;
  }

  async updateUser(updateData: Partial<User>, id: string): Promise<boolean> {
    const currentData = await this.findOneById(id);

    const finalData = Object.assign(currentData, updateData);
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

  async changePasswordByUser(id: string, password: string): Promise<boolean> {
    const user = await this.findOneById(id);

    const passwordMatch = await comparePassword(password, user.password);

    if (passwordMatch) {
      throw new Error(
        'This is the same password as you currently use! Choose another!',
      );
    }

    const hashedPassword = await hashPassword(password);

    const changed = await this.usersRepository.update(id, {
      password: hashedPassword,
    });

    if (changed.affected !== 1) {
      throw new Error('The password has not been updated.');
    }

    const value = await this.redisHandler.getValue(id, 'count');

    // all values in redis are stored as strings
    let count = parseInt(value, 10);
    count++;

    const countField = new Map<string, string>([['count', count.toString()]]);

    await this.redisHandler.setUser(id, countField);

    return true;
  }
}
