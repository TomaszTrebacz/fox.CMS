import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RedisHandlerService } from '@tomasztrebacz/nest-auth-graphql-redis';
import { comparePassword } from 'src/utils';
import { LoginDto, ChangeRoleDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private redisHandler: RedisHandlerService,
  ) {}

  async validateUser(loginCredentials: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginCredentials.email);

    if (user == undefined) {
      throw new UnauthorizedException('Wrong email or password!');
    }

    const passwordMatch = await comparePassword(
      loginCredentials.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new Error('Wrong email or password!');
    }

    return user;
  }

  async changeRole({ id, role }: ChangeRoleDto): Promise<boolean> {
    const user = await this.usersService.findOneById(id);

    if (user == undefined) throw new Error('No user with given id');

    try {
      const roleField = new Map<string, string>([['role', role]]);

      await this.redisHandler.setUser(id, roleField);
    } catch (err) {
      throw new Error(`Can not update role in db: ${err.message}`);
    }

    return true;
  }

  lowercaseField(field: string) {
    return field.toLowerCase();
  }
}
