import { InputType, Field, PartialType } from '@nestjs/graphql';
import { RoomStatus, RoomType } from '@prisma/client';
import { Room } from '../../entities/room.entity';
import { IsString } from 'class-validator';

@InputType()
export class CreateRoomInput extends PartialType(Room) {
  @Field(() => RoomType, { nullable: true })
  type?: RoomType;

  @Field(() => String, { nullable: true })
  @IsString()
  price?: string;

  @Field(() => RoomStatus, { nullable: true })
  status?: RoomStatus;
}
