import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { User, UsersWithPagination } from './user.model';
import { UsersFilterParams } from '@app/v1/users/dtos';
import { PaginationParams } from '@common/dtos';
import { DEFAULT_PAGINATION_VALUES, SEED, URLS } from '@common/constants';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}

  async list(
    paginationParams: PaginationParams,
    filteringParams: UsersFilterParams,
  ): Promise<UsersWithPagination> {
    const result = await firstValueFrom(
      this.httpService.get(
        `${URLS.RANDOM_USER}?results=5000&inc=name,login,email,phone&seed=${SEED}`,
      ),
    );
    const pageNumber =
      !paginationParams?.pageNumber || paginationParams.pageNumber < 1
        ? DEFAULT_PAGINATION_VALUES.PAGE_NUMBER
        : paginationParams.pageNumber;
    const pageSize =
      !paginationParams?.pageSize || paginationParams.pageSize < 1
        ? DEFAULT_PAGINATION_VALUES.PAGE_SIZE
        : paginationParams.pageSize;
    const min = pageSize * (pageNumber - 1);
    const max = min + pageSize;
    let count = 0;
    const data = [];
    for (const personData of result?.data?.results) {
      if (this.match(personData, filteringParams?.searchString)) {
        if (count >= min && count < max) {
          const user = new User();
          user.first_name = personData.name.first;
          user.last_name = personData.name.last;
          user.username = personData.login.username;
          user.email = personData.email;
          user.mobile = personData.phone;
          data.push(user);
        }
        count += 1;
      }
    }
    const response = new UsersWithPagination();
    response.data = data;
    response.pagination = {
      pageNumber,
      pageSize,
    };
    return response;
  }

  match(person, searchString): boolean {
    if (!searchString) return true;
    return (
      person?.name?.first?.includes(searchString) ||
      person?.login?.username?.includes(searchString) ||
      person?.email?.includes(searchString)
    );
  }
}
