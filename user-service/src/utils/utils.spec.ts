import { Test, TestingModule } from '@nestjs/testing';
import * as argon2 from 'argon2';
import { User } from 'src/graphql';
import { UserI } from 'src/models';
import { DeleteResult, UpdateResult } from 'typeorm';
import { isExecuted } from './isExecuted.util';
import { isFound } from './isFound.util';
import { comparePassword } from './password.util';

describe('Utils', () => {
  let argonCompare: jest.Mock;

  beforeEach(async () => {});

  describe('password', () => {
    describe('comparePassword', () => {
      describe('if passwords are matching', () => {
        it('should return nothing', async () => {
          argonCompare = jest.fn().mockResolvedValue(true);
          (argon2.verify as jest.Mock) = argonCompare;

          expect(await comparePassword('rawPassword', 'hashPassword')).toEqual(
            undefined,
          );
        });
      });
      describe('otherwise', () => {
        it('should throw an error', async () => {
          argonCompare = jest.fn().mockResolvedValue(false);
          (argon2.verify as jest.Mock) = argonCompare;

          try {
            await comparePassword('rawInvalidPassword', 'hashPassword');
          } catch (err) {
            expect(err.message).toEqual('Wrong password!');
          }
        });
      });
    });
  });

  describe('isExecuted', () => {
    describe('if row is actually uptaded', () => {
      it('should return nothing', () => {
        const resQuery: UpdateResult = {
          raw: {},
          affected: 1,
          generatedMaps: [],
        };

        expect(isExecuted(resQuery)).toEqual(undefined);
      });
    });
    describe('otherwise', () => {
      it('should throw an error', () => {
        const resNotExecutedQuery: UpdateResult = {
          raw: {},
          affected: 0,
          generatedMaps: [],
        };

        try {
          isExecuted(resNotExecutedQuery);
        } catch (err) {
          expect(err.message).toEqual('Database/ORM error.');
        }
      });
    });
  });

  describe('isFound', () => {
    describe('if rows exist', () => {
      it('should return noting', () => {
        const res: UserI[] = [
          {
            id: '55a1a5be-d03b-48bf-b028-47618cf5b734',
            email: 'Jan@kowalski.pl',
            firstName: 'Jam',
            lastName: 'Kowalski',
            password:
              '$argon2i$v=19$m=16,t=2,p=1$c2RhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYQ$Ef+uiuieK/R21dWf9NqPGA',
            phoneNumber: '+47123456789',
            created: new Date(),
            updated: new Date(),
          },
        ];

        expect(isFound(res)).toEqual(undefined);
      });
    });
    describe('otherwise', () => {
      it('should throw an error', () => {
        const res = undefined;

        try {
          isFound(res);
        } catch (err) {
          expect(err.message).toEqual('Can not find any data.');
        }
      });
    });
  });
});
