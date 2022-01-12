import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationModel {
  @Field({ nullable: true, defaultValue: 100 })
  pageSize: number;

  @Field({ nullable: true, defaultValue: 1 })
  pageNumber: number;
}
