import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ReservationStatus } from '@prisma/client';

@ObjectType()
export class Reservation {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  reservationID: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  userID: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  roomID?: string;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  checkIn: Date;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  checkOut: Date;

  @Field(() => ReservationStatus)
  @IsNotEmpty()
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}

registerEnumType(ReservationStatus, { name: 'ReservationStatus' });
