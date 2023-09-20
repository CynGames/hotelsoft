import { Injectable } from '@nestjs/common';

import { Room } from '@prisma/client';
import { RoomsRepository } from './rooms.repository';
import { CreateRoomInput } from './dto/inputs/create-room.input';
import { UpdateRoomInput } from './dto/inputs/update-room.input';
import { RoomQueryParamsDto } from './dto/args/room-query-params.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  findAll(roomQueryParams: RoomQueryParamsDto) {
    return this.roomsRepository.findAll(roomQueryParams);
  }

  findOneByID(roomID: string): Promise<Room> {
    return this.roomsRepository.findOneByID(roomID);
  }

  create(room: CreateRoomInput): Promise<Room> {
    return this.roomsRepository.create(room);
  }

  update(room: UpdateRoomInput): Promise<Room> {
    return this.roomsRepository.update(room);
  }

  remove(roomID: string): Promise<Room> {
    return this.roomsRepository.remove(roomID);
  }
}
