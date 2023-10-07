import { PaginationQueryParamsDto } from '../../../common/pagination.query.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { RoomStatus, RoomType } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class RoomQueryParamsDto extends PaginationQueryParamsDto {
  @Field(() => RoomType, { nullable: true })
  @IsOptional()
  type?: RoomType;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  price?: string;

  @Field(() => RoomStatus, { nullable: true })
  @IsOptional()
  status?: RoomStatus;
}
