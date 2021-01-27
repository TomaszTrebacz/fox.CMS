import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisHandlerService } from '@tomasztrebacz/nest-auth-graphql-redis';
import { hashPassword, isExecuted, lowercase } from '../utils';
import { UserI } from '../models';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserI>,
    private redisHandler: RedisHandlerService,
  ) {}

  findAll(): Promise<UserI[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: string): Promise<UserI> {
    try {
      return await this.usersRepository.findOneOrFail(id);
    } catch {
      throw new Error(`Can not find user with id: ${id}`);
    }
  }

  async findOneByEmail(email: string): Promise<UserI> {
    try {
      return await this.usersRepository.findOne({
        email: lowercase(email),
      });
    } catch (err) {
      throw new Error('Wrong email!');
    }
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<UserI> {
    try {
      return await this.usersRepository.findOneOrFail({
        phoneNumber: phoneNumber,
      });
    } catch {
      throw new Error('Wrong phone number!');
    }
  }

  async createUser(
    createData: Omit<UserI, 'id' | 'created' | 'updated'>,
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
    const res = await this.usersRepository.delete(id);

    await isExecuted(res);

    return true;
  }

  async changePassword(id: string, password: string): Promise<boolean> {
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
