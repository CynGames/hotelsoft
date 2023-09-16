import { Injectable } from '@nestjs/common';

import { Room } from '@prisma/client';
import { RoomsRepository } from './rooms.repository';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { FindManyRoomInput } from './dto/findMany.room.input';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  findAll(): Promise<Room[]> {
    return this.roomsRepository.findAll();
  }

  findMany(params: FindManyRoomInput): Promise<Room[]> {
    return this.roomsRepository.findMany(params);
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
