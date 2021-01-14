import {
  Resolver,
  Query,
  Args,
  ResolveReference,
  Mutation,
} from '@nestjs/graphql';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { UserInputError } from 'apollo-server-core';
import {
  AuthGqlRedisService,
  CurrentUser,
  RedisHandlerService,
  Auth,
  AccessLevel,
} from '@tomasztrebacz/nest-auth-graphql-redis';
import { SmsService } from '../sms/sms.service';
import { userRole } from '../enums';
import { MailService } from '../mail/mail.service';
import { User } from 'src/interfaces';
import { Fragment } from 'src/utils';

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
  async getUser(@Args('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Query('currentUser')
  @Auth()
  async currentUser(@CurrentUser() user: User): Promise<User> {
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
      await this.usersService.updateUser(updateData, user.id);
      return true;
    } catch (err) {
      throw new UserInputError(`Cannot update user: ${err.message}`);
    }
  }

  @Mutation()
  @Auth()
  async sendChangePhoneEmail(
    @CurrentUser() user: User,
    @Args('phoneNumber') phoneNumber: Fragment<User, 'phoneNumber'>,
  ): Promise<boolean> {
    try {
      const JWTpayload = {
        id: user.id,
        data: phoneNumber,
      };

      const { email } = await this.usersService.findOneById(user.id);

      user = { ...user, email };

      const changePhoneToken = await this.authGqlRedisService.createJWT(
        JWTpayload,
        process.env.PHONECHANGE_JWT_SECRET,
        process.env.PHONECHANGE_JWT_EXP,
      );

      const changePhoneField = new Map<string, string>([
        ['changephonetoken', changePhoneToken],
      ]);

      await this.redisHandler.setUser(user.id, changePhoneField);

      const changePhoneLink = `${process.env.FRONTEND_URL}/users/account/change-phone/token?token=${changePhoneToken}`;

      const mail = {
        mailAddress: email,
        subject: `Change phone number`,
        greeting: `Hi ${user.firstName} ${user.lastName}!`,
        content: `We've heard that you want change your phone number.
                Please click in this link: ${changePhoneLink}. 
                Make sure you don't share this link publicly, because it's unique!`,
      };

      await this.mailService.sendMail(mail);

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation()
  async changePhoneNumber(@Args('token') token: string): Promise<boolean> {
    try {
      const { id, data } = await this.authGqlRedisService.verifyToken(
        token,
        process.env.PHONECHANGE_JWT_SECRET,
      );

      const actualToken = await this.redisHandler.getValue(
        id,
        'changephonetoken',
      );

      if (token === actualToken) {
        const updateData: Partial<User> = {
          phoneNumber: data,
        };

        await this.usersService.updateUser(updateData, id);

        await this.redisHandler.deleteField(id, 'changephonetoken');
        return true;
      } else {
        throw new Error('Link is not valid.');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation()
  @AccessLevel()
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
