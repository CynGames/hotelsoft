import { Field, InputType, ID } from '@nestjs/graphql';
import { ReservationStatus } from '@prisma/client';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  userID: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  roomID: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  checkInAt: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  checkOutAt: Date;

  @Field(() => ReservationStatus, { nullable: true })
  @IsOptional()
  status: ReservationStatus;
}
