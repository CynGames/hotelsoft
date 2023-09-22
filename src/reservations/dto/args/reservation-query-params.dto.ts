import { PaginationQueryParamsDto } from '../../../common/pagination.query.args';

import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsDate, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

import { ReservationStatus } from '@prisma/client';

@ArgsType()
export class ReservationQueryParamsDto extends PaginationQueryParamsDto {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  userID?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  roomID?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  checkInAt?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  checkOutAt?: Date;

  @Field(() => ReservationStatus, { nullable: true })
  @IsOptional()
  status?: ReservationStatus;
}
