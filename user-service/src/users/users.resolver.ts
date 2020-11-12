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
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guards';
import { CurrentUser } from './decorators/user.decorator';
import { SmsService } from 'src/sms/sms.service';
import { RedisDbService } from 'src/redis-db/redis-db.service';
import { userRole } from './enums/userRole.enum';
import { RootGuard } from 'src/auth/guards/root.guard';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private smsService: SmsService,
    private redisService: RedisDbService,
  ) {}

  @Query('users')
  @UseGuards(AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  getUser(@Args('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Query('currentUser')
  @UseGuards(GqlAuthGuard)
  currentUser(@CurrentUser() user: User) {
    return this.usersService.findOneById(user.id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.usersService.findOneById(reference.id);
  }

  @Mutation()
  async registerUser(
    @Args('createUserInput') registerData: CreateUserDto,
  ): Promise<User> {
    const emailUsed = await this.usersService.findOneByEmail(
      registerData.email,
    );
    if (emailUsed) {
      throw new Error('Email is in database.');
    }

    try {
      const createdUser = await this.usersService.createUser(registerData);

      const smsEnabled = process.env.SMS_ENABLED;

      if (smsEnabled === 'TRUE') {
        const smsData = {
          phoneNumber: createdUser.phoneNumber,
          body: `Hi ${createdUser.firstName}! Welcome in the TravelCove!`,
        };

        await this.smsService.sendSMS(smsData);
      }

      const redisData = {
        id: createdUser.id,
        // default role for any new user is `user` without any special priviliges in app
        role: userRole.USER,
      };

      await this.redisService.saveUser(redisData);

      return createdUser;
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateData: UpdateUserDto,
  ): Promise<Boolean> {
    try {
      await this.usersService.updateUser(updateData, user);
      return new Boolean(true);
    } catch (err) {
      throw new UserInputError(`Cannot update user: ${err.message}`);
    }
  }

  @Mutation()
  @UseGuards(AdminGuard)
  async deleteUser(@Args('id') id: string): Promise<Boolean> {
    try {
      await this.usersService.deleteUser(id);
      await this.redisService.delete(id);
      return new Boolean(true);
    } catch (err) {
      throw new Error(
        `Can not delete user data from databases: ${err.message}`,
      );
    }
  }
}
