import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { RedisHandlerService } from '@tomasztrebacz/nest-auth-graphql-redis';
import { comparePassword, Fragment, hashPassword, lowercase } from 'src/utils';
import { UserI } from 'src/models';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserI>,
    private redisHandler: RedisHandlerService,
  ) {}

  findAll(): Promise<UserI[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: string): Promise<UserI> {
    return await this.usersRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<UserI> {
    return await this.usersRepository.findOne({
      where: { email: lowercase(email) },
    });
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<UserI> {
    return await this.usersRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
  }

  async createUser(
    createData: Fragment<
      UserI,
      'email' | 'firstName' | 'lastName' | 'password' | 'phoneNumber'
    >,
  ): Promise<UserI> {
    const validatedUser = {
      ...createData,
      email: lowercase(createData.email),
      password: await hashPassword(createData.password),
    };

    const createdUser = await this.usersRepository.save(validatedUser);

    return createdUser;
  }

  async updateUser(updateData: Partial<UserI>, id: string): Promise<boolean> {
    const currentData = await this.findOneById(id);

    const finalData = Object.assign(currentData, updateData);
    await this.usersRepository.save(finalData);

    return true;
  }

  async deleteUser(id: string): Promise<boolean> {
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
