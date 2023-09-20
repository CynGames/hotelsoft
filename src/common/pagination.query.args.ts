import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { SKIP, TAKE } from '../config/pagination-query-params.dto';

@ArgsType()
export class PaginationQueryParamsDto {
  @Field(() => Int, { nullable: true })
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  skip: number = SKIP;

  @Field(() => Int, { nullable: true })
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  take: number = TAKE;
}
