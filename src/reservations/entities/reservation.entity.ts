import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@ObjectType()
export class Reservation {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  reservationID: string;

  @Field(() => ID)
  @IsUUID()
  @IsOptional()
  guestID: string;

  @Field(() => ID)
  @IsUUID()
  @IsOptional()
  roomID: string;

  @Field(() => Date)
  @IsNotEmpty()
  checkInDate: Date;

  @Field(() => Date)
  @IsNotEmpty()
  checkOutDate: Date;

  @Field(() => String)
  @IsNotEmpty()
  status: ReservationStatus;
}

enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}
