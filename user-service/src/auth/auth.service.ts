import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.input';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ChangeRoleDto } from './dto/change-role.dto';
import * as argon2 from 'argon2';
import { RedisHandlerService } from '@tomasztrebacz/nest-auth-graphql-redis';

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

    const passwordMatch = await this.comparePassword(
      loginCredentials.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new Error('Wrong email or password!');
    }

    return user;
  }

  async validateJWT(payload: JwtPayload): Promise<boolean> {
    const userExists = await this.redisHandler.userExists(payload.id);

    if (userExists === false) {
      throw new UnauthorizedException(
        'Wrong JWT & User does not exist in database',
      );
    }

    return true;
  }

  async changeRole({ id, role }: ChangeRoleDto): Promise<Boolean> {
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

  async hashPassword(password: string): Promise<string> {
    try {
      return await argon2.hash(password, {
        type: argon2.argon2i,
        hashLength: 40,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async comparePassword(
    rawPassword: string,
    hashPassword: string,
  ): Promise<Boolean> {
    try {
      return await argon2.verify(hashPassword, rawPassword);
    } catch (err) {
      throw new Error(err);
    }
  }

  lowercaseField(field: String) {
    return field.toLowerCase();
  }
}
