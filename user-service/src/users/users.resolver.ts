import { Resolver, Query, Args, ResolveReference } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  getUser(@Args('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.usersService.findOneById(reference.id);
  }
}
