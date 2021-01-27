import { RedisUserI } from './redisUser.interface';
import { UserI } from './user.interface';

// join user fields from (shared)redis db and (interior)postgres db
export interface ExtendedUserI extends UserI, RedisUserI {}
