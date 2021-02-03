import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { Connection, DeleteResult, Repository } from 'typeorm';
import { UsersService } from './users.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<MockRepository>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    describe('if users exist', () => {
      it('should return users', async () => {
        const mockedUsers = {};

        usersRepository.find.mockReturnValue(mockedUsers);

        const users = await usersService.findAll();

        expect(users).toEqual(mockedUsers);
      });
    });
    describe('otherwise', () => {
      it('should return an error', async () => {
        usersRepository.find.mockReturnValue(undefined);

        expect(usersService.findAll()).rejects.toThrow(
          'Can not find any data.',
        );
      });
    });
  });

  describe('findOneById', () => {
    const userId = '55a1a5be-d03b-48bf-b028-47618cf5b734';

    describe('when user with ID exists', () => {
      it('should return the user', async () => {
        const expectedUser = {};

        await usersRepository.findOne.mockReturnValue(expectedUser);

        const user = await usersService.findOneById('userId');
        expect(user).toEqual(expectedUser);
      });
    });
    describe('otherwise', () => {
      it('should throw a detailed error', async () => {
        await usersRepository.findOne.mockReturnValue(undefined);

        expect(usersService.findOneById(userId)).rejects.toThrow(
          `Can not find user with id: ${userId}`,
        );
      });
    });
  });

  describe('findOneByEmail', () => {
    const userEmail = 'jan@kowalski.pl';

    describe('when user with email exists', () => {
      it('should return the user', async () => {
        const userEmail = 'jan@kowalski.pl';
        const expectedUser = {};

        await usersRepository.findOne.mockReturnValue(expectedUser);

        const user = await usersService.findOneByEmail(userEmail, true);
        expect(user).toEqual(expectedUser);
      });
    });

    describe('otherwise', () => {
      describe('if param throwError is set to true', () => {
        it('should throw a detailed error', async () => {
          await usersRepository.findOne.mockReturnValue(undefined);

          expect(usersService.findOneByEmail(userEmail, true)).rejects.toThrow(
            'Wrong email!',
          );
        });
      });
      describe('param throwError is set to false', () => {
        it('if should return undefined', async () => {
          await usersRepository.findOne.mockReturnValue(undefined);

          const user = await usersService.findOneByEmail(userEmail, false);
          expect(user).toEqual(undefined);
        });
      });
    });
  });

  describe('findOneByPhoneNumber', () => {
    const userNumber = '+48123456789';

    describe('when user with phone number exists', () => {
      it('should return the user', async () => {
        const expectedUser = {};

        await usersRepository.findOne.mockReturnValue(expectedUser);

        const user = await usersService.findOneByPhoneNumber(userNumber, true);
        expect(user).toEqual(expectedUser);
      });
    });
    describe('otherwise', () => {
      describe('if param throwError is set to true', () => {
        it('should throw a detailed error', async () => {
          await usersRepository.findOne.mockReturnValue(undefined);

          expect(
            usersService.findOneByPhoneNumber(userNumber, true),
          ).rejects.toThrow(`Can not find user with phone: ${userNumber}`);
        });
      });
      describe('if param throwError is set to false', () => {
        it('should return no error', async () => {
          await usersRepository.findOne.mockReturnValue(undefined);

          expect(
            await usersService.findOneByPhoneNumber(userNumber, false),
          ).toEqual(undefined);
        });
      });
    });
  });

  describe('createUser', () => {
    it('should save an user in the database with hashed password and lowercased email', async () => {
      const mockedUser = {};
      const usersRepositorySaveSpy = jest
        .spyOn(usersRepository, 'save')
        .mockResolvedValue(mockedUser);

      const createUserDto = {
        email: 'Jan@kowalski.pl',
        firstName: 'Jam',
        lastName: 'Kowalski',
        password: 'password',
        phoneNumber: '+47123456789',
      };

      const res = await usersService.createUser(createUserDto);

      expect(usersRepositorySaveSpy).not.toHaveBeenCalledWith(createUserDto);

      expect(usersRepositorySaveSpy).toHaveBeenCalledWith({
        email: 'Jan@kowalski.pl',
        firstName: 'Jam',
        lastName: 'Kowalski',
        password: expect.any(String),
        phoneNumber: '+47123456789',
      }),
        expect(res).toEqual(mockedUser);
    });
  });

  describe('updateUser', () => {
    const mockedUser = {
      id: '55a1a5be-d03b-48bf-b028-47618cf5b734',
      email: 'Jan@kowalski.pl',
      firstName: 'Jam',
      lastName: 'Kowalski',
      password: 'password',
      phoneNumber: '+47123456789',
    };

    describe('when user exists in database', () => {
      it('should update user and return true', async () => {
        const usersRepositorySaveSpy = jest
          .spyOn(usersRepository, 'findOne')
          .mockResolvedValue(mockedUser);

        const user = await usersService.findOneById(mockedUser.id);

        expect(usersRepositorySaveSpy).toHaveBeenCalled();

        const updateData = {
          firstName: 'John',
          lastName: 'Smith',
        };

        const updatedUser = {
          ...user,
          ...updateData,
        };

        const usersRepositoryUpdateSpy = jest
          .spyOn(usersRepository, 'save')
          .mockReturnValue(updatedUser);

        const result = await usersService.updateUser(
          updatedUser,
          mockedUser.id,
        );
        expect(usersRepositoryUpdateSpy).toHaveBeenCalledWith(updatedUser);

        expect(result).toEqual(true);
      });
      describe('otherwise', () => {
        it('should throw detailed error', async () => {
          const usersRepositoryFindSpy = jest.spyOn(usersRepository, 'findOne');
          const usersRepositorySaveSpy = jest.spyOn(usersRepository, 'save');

          expect(
            usersService.updateUser(mockedUser, mockedUser.id),
          ).rejects.toThrow(`Can not update user with id: ${mockedUser.id}`);

          expect(usersRepositoryFindSpy).toHaveBeenCalled();
          expect(usersRepositorySaveSpy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('deleteUser', () => {
    const userId = '55a1a5be-d03b-48bf-b028-47618cf5b734';

    describe('if user was deleted', () => {
      it('should return true', async () => {
        const mockedResult: DeleteResult = {
          raw: {},
          affected: 1,
        };

        const usersRepositoryDeleteSpy = jest
          .spyOn(usersRepository, 'delete')
          .mockResolvedValue(mockedResult);

        const res = await usersService.deleteUser(userId);

        expect(usersRepositoryDeleteSpy).toHaveBeenCalledWith(userId);

        expect(res).toEqual(true);
      });
    });
    describe('otherwise', () => {
      it('should throw an error', async () => {
        const mockedError: DeleteResult = {
          raw: {},
          affected: 0,
        };

        await usersRepository.delete.mockReturnValue(mockedError);

        expect(usersService.deleteUser(userId)).rejects.toThrow(
          'Database/ORM error.',
        );
      });
    });
  });
});
