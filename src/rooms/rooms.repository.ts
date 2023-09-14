import { CreateRoomInput } from './dto/create-room.input';
import { PrismaService } from '../database/prisma.service';
import { Room } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateRoomInput): Promise<Room> {
    return this.prismaService.room.create({
      data: {
        type: data.type,
        price: data.price,
        status: data.status,
      },
    });
  }
}
