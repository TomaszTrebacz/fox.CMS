import {
  Resolver,
  Query,
  Args,
  ResolveReference,
  Mutation,
} from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserInputError } from 'apollo-server-core';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  getUser(@Args('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.usersService.findOneById(reference.id);
  }

  @Mutation()
  async registerUser(
    @Args('createUserInput') registerData: CreateUserDto,
  ): Promise<User> {
    try {
      const createdUser = await this.usersService.createUser(registerData);
      return createdUser;
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

  @Mutation()
  async updateUser(
    @Args('updateUserInput') updateData: UpdateUserDto,
  ): Promise<Boolean> {
    try {
      await this.usersService.updateUser(updateData);
      return new Boolean(true);
    } catch (err) {
      throw new UserInputError(`Cannot update user: ${err.message}`);
    }
  }

  @Mutation()
  async deleteUser(@Args('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
