import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UsersFilterParams {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  searchString: string;
}
