import { InputType, Field, Int } from '@nestjs/graphql';
import { RoomStatus, RoomType } from '@prisma/client';

@InputType()
export class CreateRoomInput {
  @Field(() => RoomType)
  type: RoomType;

  @Field(() => Int)
  price: number;

  @Field(() => RoomStatus)
  status: RoomStatus;
}
