import {
  Resolver,
  Query,
  Args,
  ResolveReference,
  Mutation,
} from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../database/entities/user.entity';
import { UsersService } from './users.service';
import { UserInputError } from 'apollo-server-core';
import {
  AuthGqlRedisService,
  CurrentUser,
  RedisHandlerService,
  Auth,
} from '@tomasztrebacz/nest-auth-graphql-redis';
import { SmsService } from '../sms/sms.service';
import { userRole } from '../shared/userRole.enum';
import { MailService } from '../mail/mail.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private smsService: SmsService,
    private mailService: MailService,
    private redisHandler: RedisHandlerService,
    private authGqlRedisService: AuthGqlRedisService,
  ) {}

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  getUser(@Args('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Query('currentUser')
  @Auth()
  async currentUser(@CurrentUser() user: User) {
    return await this.usersService.findOneById(user.id);
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

      const smsEnabled = process.env.SMS_ENABLED;

      if (smsEnabled === 'TRUE') {
        const smsData = {
          phoneNumber: createdUser.phoneNumber,
          body: `Hi ${createdUser.firstName}! Welcome in the TravelCove!`,
        };

        await this.smsService.sendSMS(smsData);
      }

      const JWTpayload = {
        id: createdUser.id,
      };

      const confirmJWT = await this.authGqlRedisService.createJWT(
        JWTpayload,
        process.env.CONFIRM_JWT_SECRET,
        process.env.CONFIRM_JWT_EXP,
      );

      /*
        type string is required for all values because of redis database
        - default role for any new user is (enum)`user` without any special priviliges in app
        - count mechanism is an alternative to a blacklist, 
          default is 0 -> count++ when user change password etc.
      */
      const userProperties = new Map<string, string>([
        ['role', userRole.USER],
        ['count', '0'],
        ['confirmed', 'false'],
        ['confirmtoken', confirmJWT],
      ]);

      await this.redisHandler.setUser(createdUser.id, userProperties);

      const confirmLink = `${process.env.FRONTEND_URL}/users/confirm-account?token=${confirmJWT}`;

      const mail = {
        greeting: `Hi ${createdUser.firstName} ${createdUser.lastName}!`,
        content: `I'm so glad you registered in our app! 
                  Please confirm your mail by clicking in this link: ${confirmLink}. 
                  Make sure you don't share this link publicly, because it's unique for you!`,
        subject: `Registration in TravelCove app | Confirm your email! `,
        mailAddress: createdUser.email,
      };

      this.mailService.sendMail(mail);

      return createdUser;
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

  @Mutation()
  @Auth()
  async updateUser(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateData: UpdateUserDto,
  ): Promise<boolean> {
    try {
      await this.usersService.updateUser(updateData, user);
      return true;
    } catch (err) {
      throw new UserInputError(`Cannot update user: ${err.message}`);
    }
  }

  @Mutation()
  @Auth(userRole.ADMIN, userRole.ROOT)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    try {
      await this.usersService.deleteUser(id);
      await this.redisHandler.deleteUser(id);
      return true;
    } catch (err) {
      throw new Error(
        `Can not delete user data from databases: ${err.message}`,
      );
    }
  }
}
