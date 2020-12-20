import { User } from '../../database/entities/user.entity';
import { RedisUser } from './redis-user.interface';

export interface ExtendedUserData extends User, RedisUser {}
