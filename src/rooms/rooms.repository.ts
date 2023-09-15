import { CreateRoomInput } from './dto/create-room.input';
import { PrismaService } from '../database/prisma.service';
import { Room } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UpdateRoomInput } from './dto/update-room.input';
import { FindManyRoomInput } from './dto/findMany.room.input';

@Injectable()
export class RoomsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<Room[]> {
    return this.prismaService.room.findMany();
  }

  findMany(where: FindManyRoomInput) {
    return this.prismaService.room.findMany({ where });
  }

  findOneByID(roomID: string): Promise<Room> {
    return this.prismaService.room.findUniqueOrThrow({ where: { roomID } });
  }

  create(data: CreateRoomInput): Promise<Room> {
    return this.prismaService.room.create({
      data: {
        type: data.type,
        price: data.price,
        status: data.status,
      },
    });
  }

  update(room: UpdateRoomInput): Promise<Room> {
    return this.prismaService.room.update({
      where: { roomID: room.roomID },
      data: {
        type: room.type,
        price: room.price,
        status: room.status,
      },
    });
  }

  remove(roomID: string): Promise<Room> {
    return this.prismaService.room.delete({ where: { roomID } });
  }
}
