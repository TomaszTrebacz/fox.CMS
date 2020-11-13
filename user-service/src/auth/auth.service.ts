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

    const passwordMatch = await this.comparePassword(
      loginCredentials.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new Error('Wrong email or password!');
    }

    return user;
  }

  createJwt(user: User, role: string) {
    const payload = { id: user.id, role: role };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async validateJwt(payload: JwtPayload) {
    const role = await this.redisService.getRole(payload.id);

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
