import { UserI } from '../models';
import { isFound } from './isFound.util';

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
