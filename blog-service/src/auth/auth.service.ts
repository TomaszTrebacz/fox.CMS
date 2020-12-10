import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisDbService } from 'src/redis-db/redis-db.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private redisService: RedisDbService) {}

  async validateJWT(payload: JwtPayload): Promise<boolean> {
    const userExists = await this.redisService.isUserExists(payload.id);

    if (userExists === false) {
      throw new UnauthorizedException(
        'Wrong JWT & User does not exist in database',
      );
    }

    return true;
  }
}
