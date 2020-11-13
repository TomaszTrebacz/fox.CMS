import { Injectable } from '@nestjs/common';
import { RedisDbService } from 'src/redis-db/redis-db.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private redisService: RedisDbService) {}

  async validateJwt(payload: JwtPayload) {
    const role = await this.redisService.getUser(payload.id);

    if (role !== payload.role) {
      throw new Error('Authorization error');
    }
  }
}
