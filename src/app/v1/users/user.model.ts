import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { PaginationModel } from '@common/models';

@ObjectType()
export class User {
  @Field()
  @IsString()
  first_name: string;

  @Field()
  @IsString()
  last_name: string;

  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  email: string;

  @Field()
  @IsString()
  mobile: string;
}

@ObjectType()
export class UsersWithPagination {
  @Field({ nullable: true })
  @Type(() => PaginationModel)
  pagination: PaginationModel;

  @Field(() => [User], { nullable: true })
  @Type(() => User)
  data: User[];
}
