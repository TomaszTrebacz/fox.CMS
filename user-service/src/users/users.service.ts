import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword, isArrayFound, isExecuted, isFound } from '../utils';
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

    await isArrayFound(users);

    return users;
  }

  async findOneById(id: string): Promise<UserI> {
    const user = await this.usersRepository.findOne(id);

    await isFound(user, `Can not find user with id: ${id}`);

    return user;
  }

  async findOneByEmail(email: string, throwError: boolean): Promise<UserI> {
    const user = await this.usersRepository.findOne({
      email: email,
    });

    if (throwError === true) {
      await isFound(user, 'Wrong email!');
    }

    return user;
  }

  async findOneByPhoneNumber(
    phoneNumber: string,
    throwError: boolean,
  ): Promise<UserI> {
    const user = await this.usersRepository.findOne({
      phoneNumber: phoneNumber,
    });

    if (throwError === true) {
      await isFound(user, `Can not find user with phone: ${phoneNumber}`);
    }

    return user;
  }

  async createUser(
    createData: Omit<UserI, 'id' | 'created' | 'updated'>,
  ): Promise<UserI> {
    const validatedUser = {
      ...createData,
      email: createData.email,
      password: await hashPassword(createData.password),
    };

    const createdUser = await this.usersRepository.save(validatedUser);

    await isFound(createdUser, 'Can not save in database');

    return createdUser;
  }

  async updateUser(updateData: Partial<UserI>, id: string): Promise<boolean> {
    try {
      const currentData = await this.findOneById(id);

      const finalData = Object.assign(currentData, updateData);

      const updatedUser = await this.usersRepository.save(finalData);

      await isFound(updatedUser, 'Can not save in database');

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
