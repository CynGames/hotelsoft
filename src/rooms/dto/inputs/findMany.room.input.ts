import { InputType, PartialType } from '@nestjs/graphql';
import { Room } from '../../entities/room.entity';

@InputType()
export class FindManyRoomInput extends PartialType(Room, InputType) {}
