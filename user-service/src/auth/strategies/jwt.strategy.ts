import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthenticationError } from 'apollo-server-core';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      await this.authService.validateJwt(payload);
    } catch (err) {
      throw new AuthenticationError(err.message);
    }

    return payload;
  }
}
