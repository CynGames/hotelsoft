import {
  ObjectType,
  Field,
  registerEnumType,
  ID,
  Float,
} from '@nestjs/graphql';
import { RoomStatus, RoomType } from '@prisma/client';

@ObjectType()
export class Room {
  @Field(() => ID)
  roomID: string;

  @Field(() => RoomType)
  type: RoomType;

  @Field(() => Float)
  price: number;

  @Field(() => RoomStatus)
  status: RoomStatus;
}

registerEnumType(RoomType, { name: 'RoomType' });
registerEnumType(RoomStatus, { name: 'RoomStatus' });
