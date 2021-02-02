import { Test, TestingModule } from '@nestjs/testing';
import { RedisHandlerService } from '@tomasztrebacz/nest-auth-graphql-redis';
import { UserI } from '../models';
import { comparePassword, hashPassword } from '../utils';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

const user: UserI = {
  id: '55a1a5be-d03b-48bf-b028-47618cf5b734',
  email: 'Jan@kowalski.pl',
  firstName: 'Jam',
  lastName: 'Kowalski',
  password:
    '$argon2i$v=19$m=16,t=2,p=1$c2RhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYQ$Ef+uiuieK/R21dWf9NqPGA',
  phoneNumber: '+47123456789',
  created: new Date(2018, 10, 10, 10, 23, 42, 11),
  updated: new Date(2020, 8, 3, 11, 54, 21, 9),
};

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let redisHandler: RedisHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
            updateUser: jest.fn(),
          },
        },
        {
          provide: RedisHandlerService,
          useValue: {
            setUser: jest.fn(),
            getValue: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    redisHandler = module.get<RedisHandlerService>(RedisHandlerService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    const loginInput = {
      email: user.email,
      password: 'jijijjijijiasdfffffffff',
    };

    describe('if user was successfully validated', () => {
      it('should return user', async () => {
        const usersServiceFindSpy = jest
          .spyOn(usersService, 'findOneByEmail')
          .mockResolvedValue(user);

        const res = await authService.validateUser(loginInput);

        expect(usersServiceFindSpy).toHaveBeenCalledWith(
          loginInput.email,
          true,
        );

        expect(res).toEqual(user);
      });
    });
    describe('otherwise', () => {
      describe('if user does not exist in database', () => {
        it('should throw an error', async () => {
          const throwError = () => {
            throw new Error('Wrong email!');
          };

          const usersServiceFindSpy = jest
            .spyOn(usersService, 'findOneByEmail')
            .mockImplementation(throwError);

          try {
            await authService.validateUser(loginInput);
          } catch (err) {
            expect(err.message).toEqual('Wrong email!');
          } finally {
            expect(usersServiceFindSpy).toHaveBeenCalledWith(
              loginInput.email,
              true,
            );
          }
        });
      });
      describe('if user gave wrong password', () => {
        it('should throw an error', async () => {
          const usersServiceFindSpy = jest
            .spyOn(usersService, 'findOneByEmail')
            .mockResolvedValue(user);

          const invalidPassInput = {
            email: user.email,
            password: 'wrongPassword',
          };

          try {
            await authService.validateUser(invalidPassInput);
          } catch (err) {
            expect(err.message).toEqual('Wrong password!');
          } finally {
            expect(usersServiceFindSpy).toHaveBeenCalledWith(
              loginInput.email,
              true,
            );
          }
        });
      });
    });
  });

  describe('changeRole', () => {
    const changeRoleInput = {
      id: user.id,
      role: 'admin',
    };

    describe('if role has been changed', () => {
      it('should return true', async () => {
        const redisHandlerSetUserSpy = jest
          .spyOn(redisHandler, 'setUser')
          .mockResolvedValue(true);

        expect(await authService.changeRole(changeRoleInput)).toEqual(true);

        expect(redisHandlerSetUserSpy).toHaveBeenCalledWith(
          user.id,
          new Map([['role', 'admin']]),
        );
      });
    });
    describe('otherwise', () => {
      it('should throw an error', async () => {
        const throwError = () => {
          throw new Error('Can not update data!');
        };

        const redisHandlerSetUserSpy = jest
          .spyOn(redisHandler, 'setUser')
          .mockImplementation(throwError);

        try {
          await authService.changeRole(changeRoleInput);
        } catch (err) {
          expect(err.message).toEqual('Can not update data!');
          expect(redisHandlerSetUserSpy).toHaveBeenCalled();
        }
      });
    });
  });

  describe('changePassword', () => {
    const newPassword = 'newRawPassword';

    describe('if password has been changed', () => {
      it('should increase count property in redis db and return true', async () => {
        const usersRepositoryUpdateSpy = jest
          .spyOn(usersService, 'updateUser')
          .mockResolvedValue(true);

        const redisHandlerGetValueSpy = jest
          .spyOn(redisHandler, 'getValue')
          .mockResolvedValue('0');

        const redisHandlerSetUserSpy = jest.spyOn(redisHandler, 'setUser');

        const res = await authService.changePassword(user.id, newPassword);

        expect(usersRepositoryUpdateSpy).not.toHaveBeenCalledWith(
          user.password,
          user.id,
        );

        expect(redisHandlerGetValueSpy).toHaveBeenCalled();
        expect(redisHandlerSetUserSpy).toHaveBeenCalledWith(
          user.id,
          new Map([['count', '1']]),
        );

        expect(res).toEqual(true);
      });
    });
    describe('otherwise', () => {
      describe('if can not update password in sql database', () => {
        it('should throw an error', async () => {
          const throwError = () => {
            throw new Error('Can not update user!');
          };

          const usersServiceUpdateSpy = jest
            .spyOn(usersService, 'updateUser')
            .mockImplementation(throwError);

          const redisHandlerGetValueSpy = jest.spyOn(redisHandler, 'getValue');
          const redisHandlerSetUserSpy = jest.spyOn(redisHandler, 'setUser');

          try {
            await authService.changePassword(user.id, user.password);
          } catch (err) {
            expect(err.message).toEqual('Can not update user!');
          } finally {
            expect(usersServiceUpdateSpy).toHaveBeenCalled();
            expect(redisHandlerGetValueSpy).not.toHaveBeenCalled();
            expect(redisHandlerSetUserSpy).not.toHaveBeenCalled();
          }
        });
      });
      describe('if user does not exist in redis database', () => {
        it('should throw an error', async () => {
          const throwError = () => {
            throw new Error('Can not get data!');
          };
          const usersServiceUpdateSpy = jest.spyOn(usersService, 'updateUser');

          const redisHandlerGetValueSpy = jest
            .spyOn(redisHandler, 'getValue')
            .mockImplementation(throwError);

          const redisHandlerSetUserSpy = jest.spyOn(redisHandler, 'setUser');

          try {
            await authService.changePassword(user.id, user.password);
          } catch (err) {
            expect(err.message).toEqual('Can not get data!');
          } finally {
            expect(usersServiceUpdateSpy).toHaveBeenCalled();
            expect(redisHandlerGetValueSpy).toHaveBeenCalled();
            expect(redisHandlerSetUserSpy).not.toHaveBeenCalled();
          }
        });
      });
      describe('if can not update data in redis key-value data store', () => {
        it('should throw an error', async () => {
          const throwError = () => {
            throw new Error('Can not update data!');
          };

          const usersServiceUpdateSpy = jest
            .spyOn(usersService, 'updateUser')
            .mockResolvedValue(true);
          const redisHandlerGetValueSpy = jest
            .spyOn(redisHandler, 'getValue')
            .mockResolvedValue('0');

          const redisHandlerSetUserSpy = jest
            .spyOn(redisHandler, 'setUser')
            .mockImplementation(throwError);

          try {
            await authService.changePassword(user.id, user.password);
          } catch (err) {
            expect(err.message).toEqual('Can not update data!');
          } finally {
            expect(usersServiceUpdateSpy).toHaveBeenCalled();
            expect(redisHandlerGetValueSpy).toHaveBeenCalled();
            expect(redisHandlerSetUserSpy).toHaveBeenCalledWith(
              user.id,
              new Map([['count', '1']]),
            );
          }
        });
      });
    });
  });
});
