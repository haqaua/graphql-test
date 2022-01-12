import { Resolver, Query, Args } from '@nestjs/graphql';

import { User, UsersWithPagination } from './user.model';
import { UserService } from './user.service';
import { PaginationParams } from '@common/dtos';
import { UsersFilterParams } from '@app/v1/users/dtos';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UsersWithPagination)
  async usersList(
    @Args('pagination', {
      nullable: true,
      description: 'Pagination options (Page Number & Page Size)',
    })
    paginationParams: PaginationParams,
    @Args('search', {
      nullable: true,
      description:
        'Get all items that match the query string in the name, firstname or email field',
    })
    filteringParams: UsersFilterParams,
  ): Promise<UsersWithPagination> {
    return this.userService.list(paginationParams, filteringParams);
  }
}
