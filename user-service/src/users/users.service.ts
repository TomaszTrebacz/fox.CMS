import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword, isExecuted, isFound, lowercase } from '../utils';
import { UserI } from '../models';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserI>,
  ) {}

  async findAll(): Promise<UserI[]> {
    const users = await this.usersRepository.find();

    await isFound(users);

    return users;
  }

  async findOneById(id: string): Promise<UserI> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new Error(`Can not find user with id: ${id}`);
    }

    return user;
  }

  async findOneByEmail(email: string, throwError: boolean): Promise<UserI> {
    const user = await this.usersRepository.findOne({
      email: lowercase(email),
    });

    if (!user && throwError === true) {
      throw new Error('Wrong email!');
    }

    return user;
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<UserI> {
    const user = await this.usersRepository.findOne({
      phoneNumber: phoneNumber,
    });

    if (!user) {
      throw new Error(`Can not find user with phone: ${phoneNumber}`);
    }

    return user;
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
    try {
      const currentData = await this.findOneById(id);

      const finalData = Object.assign(currentData, updateData);

      await this.usersRepository.save(finalData);

      return true;
    } catch (err) {
      throw new Error(`Can not update user with id: ${id}`);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    const res = await this.usersRepository.delete(id);

    await isExecuted(res);

    return true;
  }
}
