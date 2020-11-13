import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { AuthenticationError } from 'apollo-server-core';
import { userRole } from '../enums/userRole.enum';

@Injectable()
export class AdminGuard extends GqlAuthGuard {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (user.role == userRole.ADMIN || user.role == userRole.ROOT) {
      return user;
    } else {
      throw new AuthenticationError(
        'Can not access this part of api with your privileges.',
      );
    }
  }
}
