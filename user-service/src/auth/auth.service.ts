import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.input';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RedisDbService } from 'src/redis-db/redis-db.service';
import { ChangeRoleDto } from './dto/change-role.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisDbService,
  ) {}

  async validateUser(loginCredentials: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginCredentials.email);

    if (user == undefined) {
      throw new Error('Wrong email or password!');
    }

    // migrate from bcrypt (which hashes start with '$2')to argon
    if (user.password.startsWith('$2')) {
      const passwordMatch = await this.comparePasswordBcrypt(
        loginCredentials.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new Error('Wrong email or password!');
      }

      await this.usersService.updatePassword(user.id, user.password);
    } else {
      const passwordMatch = this.comparePassword(
        loginCredentials.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new Error('Wrong email or password!');
      }
    }

    const isConfirmed = await this.redisService.getValue(user.id, 'confirmed');

    if (isConfirmed === 'false') {
      throw new Error('User is not confirmed. Please confirm accout');
    }

    return user;
  }

  createAccessJwt(id: string) {
    const payload = { id: id };

    const token = this.jwtService.sign(payload);

    return token;
  }

  createRefreshJwt(id: string, count: number) {
    const payload = { id: id, count: count };
    const token = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_JWT_SECRET,
      expiresIn: process.env.REFRESH_JWT_EXP,
    });

    return token;
  }

  // secret & exp is setted in auth.module.ts in config env
  createDefaultJWT(payload) {
    return this.jwtService.sign(payload);
  }

  createJWT(payload, { secret, expiresIn }) {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }

  async validateJWT(payload: JwtPayload): Promise<boolean> {
    const userExists = await this.redisService.isUserExists(payload.id);

    if (userExists === false) {
      throw new UnauthorizedException(
        'Wrong JWT & User does not exist in database',
      );
    }

    return true;
  }

  async changeRole(changeRoleData: ChangeRoleDto): Promise<Boolean> {
    const user = await this.usersService.findOneById(changeRoleData.id);

    if (user == undefined) throw new Error('No user with given id');

    try {
      await this.redisService.changeRole(changeRoleData);
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
      return argon2.verify(hashPassword, rawPassword);
    } catch (err) {
      throw new Error(err);
    }
  }

  // deprecated, use only for migration reason (from bcrypt to argon)
  async comparePasswordBcrypt(
    rawPassword: string,
    hashPassword: string,
  ): Promise<Boolean> {
    try {
      return bcrypt.compare(hashPassword, rawPassword);
    } catch (err) {
      throw new Error(err);
    }
  }

  lowercaseField(field: String) {
    return field.toLowerCase();
  }
}
