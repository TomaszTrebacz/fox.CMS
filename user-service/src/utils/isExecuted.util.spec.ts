import { UpdateResult } from 'typeorm';
import { isExecuted } from './isExecuted.util';

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
