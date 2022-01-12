import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class PaginationParams {
  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  pageNumber: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  pageSize: number;
}
