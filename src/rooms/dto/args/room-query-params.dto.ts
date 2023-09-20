import { PaginationQueryParamsDto } from '../../../common/pagination.query.args';
import { ArgsType, Field, Float } from '@nestjs/graphql';
import { RoomStatus, RoomType } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

@ArgsType()
export class RoomQueryParamsDto extends PaginationQueryParamsDto {
  @Field(() => RoomType)
  @IsEnum(RoomType)
  @IsOptional()
  type?: RoomType;

  @Field(() => Float)
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  price: number;

  @Field(() => RoomStatus)
  @IsEnum(RoomStatus)
  @IsOptional()
  status: RoomStatus;
}