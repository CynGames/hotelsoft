import { Field, ID, InputType } from '@nestjs/graphql';
import { ReservationStatus } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  userID: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  roomID: string;

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
