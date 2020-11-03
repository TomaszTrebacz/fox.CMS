import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { AuthenticationError } from 'apollo-server-core';

@Injectable()
export class RootGuard extends GqlAuthGuard {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (user.role !== 'root') {
      throw new AuthenticationError(
        'Can not access this part of api with your privileges.',
      );
    }

    return user;
  }
}
