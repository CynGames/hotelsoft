import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { ReservationStatus } from '@prisma/client';

@ObjectType()
export class Reservation {
  @Field(() => ID)
  reservationID?: string;

  @Field(() => ID)
  userID?: string;

  @Field(() => ID)
  roomID?: string;

  @Field(() => Date)
  checkInAt?: Date;

  @Field(() => Date)
  checkOutAt?: Date;

  @Field(() => ReservationStatus)
  status?: ReservationStatus;
}

registerEnumType(ReservationStatus, { name: 'ReservationStatus' });
