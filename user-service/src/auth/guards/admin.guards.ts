import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { AuthenticationError } from 'apollo-server-core';

@Injectable()
export class AdminGuard extends GqlAuthGuard {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (user.role !== 'admin') {
      throw new AuthenticationError(
        'Can not access this part of api with your privileges.',
      );
    }

    return user;
  }
}
