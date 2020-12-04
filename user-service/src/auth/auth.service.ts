import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.input';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/graphql';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RedisDbService } from 'src/redis-db/redis-db.service';
import { ChangeRoleDto } from './dto/change-role.dto';

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

    const redisData = {
      id: user.id,
      key: 'confirmed',
    };
    const isConfirmed = await this.redisService.getValue(redisData);

    if (isConfirmed === 'false') {
      throw new Error('User is not confirmed. Please confirm accout');
    }

    if (user == undefined) {
      throw new Error('Wrong email or password!');
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

  createAccessJwt(id: string, role: string) {
    const payload = { id: id, role: role };

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

  async validateJwt(payload: JwtPayload) {
    const redisData = {
      id: payload.id,
      key: 'role',
    };

    const role = await this.redisService.getValue(redisData);

    if (role !== payload.role) {
      throw new Error('Authorization error');
    }
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

  hashPassword(password: String) {
    const saltRounds = parseInt(process.env.SALT_LENGTH);
    const hash = bcrypt.hashSync(password, saltRounds);

    return hash;
  }

  comparePassword(rawPassword, hashPassword) {
    return bcrypt.compare(rawPassword, hashPassword);
  }

  lowercaseField(field: String) {
    return field.toLowerCase();
  }
}
