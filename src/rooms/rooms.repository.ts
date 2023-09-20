import { CreateRoomInput } from './dto/inputs/create-room.input';
import { PrismaService } from '../database/prisma.service';
import { Room } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UpdateRoomInput } from './dto/inputs/update-room.input';
import { FindManyRoomInput } from './dto/inputs/findMany.room.input';
import { RoomQueryParamsDto } from './dto/args/room-query-params.dto';
import { IRoomPagination } from './entities/room-pagination.model';

@Injectable()
export class RoomsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({
    skip,
    take,
    ...where
  }: RoomQueryParamsDto): Promise<IRoomPagination> {
    const total = await this.prismaService.room.count({ where });
    const data = await this.prismaService.room.findMany({ skip, take, where });

    return { total, data };
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
