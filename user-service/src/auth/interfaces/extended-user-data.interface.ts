import { User } from 'src/users/entities/user.entity';
import { RedisUser } from './redis-user.interface';

export interface ExtendedUserData extends User, RedisUser {}
