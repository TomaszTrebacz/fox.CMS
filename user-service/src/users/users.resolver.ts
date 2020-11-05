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
import { MailService } from 'src/mail/mail.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
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
    try {
      const createdUser = await this.usersService.createUser(registerData);

      const mail = {
        greeting: `Hi ${createdUser.firstName} ${createdUser.lastName}!`,
        content: 'Welcome on the board!',
        subject: 'Registration',
        mailAddress: createdUser.email,
      };

      this.mailService.sendMail(mail);

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
  async deleteUser(@Args('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
