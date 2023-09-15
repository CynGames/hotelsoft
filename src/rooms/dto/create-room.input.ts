import { InputType, Field, Float } from '@nestjs/graphql';
import { RoomStatus, RoomType } from '@prisma/client';

@InputType()
export class CreateRoomInput {
  @Field(() => RoomType)
  type: RoomType;

  @Field(() => Float)
  price: number;

  @Field(() => RoomStatus)
  status: RoomStatus;
}
