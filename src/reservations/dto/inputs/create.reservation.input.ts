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
  checkInAt: Date;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  checkOutAt: Date;

  @Field(() => ReservationStatus)
  @IsNotEmpty()
  status: ReservationStatus;
}
