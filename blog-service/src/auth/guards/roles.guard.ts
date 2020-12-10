import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { userRole } from 'src/auth/enums/userRole.enum';
import { AuthenticationError } from 'apollo-server-core';

@Injectable()
export class RolesGuard extends GqlAuthGuard {
  constructor(
    @Inject('RedisDbService') private readonly redisService,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<userRole[]>('roles', context.getHandler());

    if (roles) {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;

      const actualRole = await this.redisService.getValue(
        request.user.id,
        'role',
      );

      if (!roles.includes(actualRole)) {
        throw new AuthenticationError('Wrong role!');
      }
    }

    return true;
  }
}
