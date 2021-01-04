import { RedisUser } from './redis-user.interface';
import { User } from './user.interface';

// join user fields from (shared)redis db and (interior)postgres db
export interface ExtendedUser extends User, RedisUser {}
