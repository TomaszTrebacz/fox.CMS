import * as argon2 from 'argon2';
import { comparePassword } from './password.util';

describe('password', () => {
  let argonCompare: jest.Mock;

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
