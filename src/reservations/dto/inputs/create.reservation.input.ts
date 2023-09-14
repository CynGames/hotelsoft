import { Field, ID, InputType } from '@nestjs/graphql';
import { ReservationStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  userID: string;

  @Field(() => ID)
  @IsOptional()
  @IsUUID()
  roomID?: string;

  @Field(() => Date)
  @IsNotEmpty()
  checkIn: Date;

  @Field(() => Date)
  @IsNotEmpty()
  checkOut: Date;

  @Field(() => ReservationStatus)
  @IsNotEmpty()
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}
