import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { userRole } from 'src/users/enums/userRole.enum';

@Injectable()
export class RolesGuard extends GqlAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<userRole[]>('roles', context.getHandler());

    if (roles) {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      const role = <userRole>request.user.role;

      if (!roles.includes(role)) {
        throw new UnauthorizedException('Wrong role!');
      }
    }

    return super.canActivate(context);
  }
}
