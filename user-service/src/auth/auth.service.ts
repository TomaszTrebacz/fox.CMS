import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.input';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/graphql';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginCredentials: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginCredentials.email);

    const passwordMatch = await this.comparePassword(
      loginCredentials.password,
      user.password,
    );

    if (!passwordMatch) {
      return undefined;
    }

    return user;
  }

  createJwt(user: User) {
    const payload = { id: user.id, role: user.role };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async validateJwt(payload: JwtPayload) {
    const user = await this.usersService.findOneById(payload.id);

    if (user.role !== payload.role) {
      return undefined;
    }

    return user;
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
