import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateGuestInput, UpdateGuestInput } from './dto/inputs';
import { Guest } from './entities/guest.entity';

@Injectable()
export class GuestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Guest[]> {
    return this.prisma.guest.findMany({});
  }

  // async findMany(params: any): Promise<Guest[]> {
  //   return this.prisma.guest.findMany(params);
  // }

  async getByID(guestID: number): Promise<Guest> {
    return this.prisma.guest.findUniqueOrThrow({ where: { guestID } });
  }

  async create(data: CreateGuestInput): Promise<Guest> {
    return this.prisma.guest.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  async update(guestID: number, data: UpdateGuestInput): Promise<Guest> {
    return this.prisma.guest.update({ data, where: { guestID } });
  }

  async delete(guestID: number): Promise<boolean> {
    await this.prisma.guest.delete({ where: { guestID } });
    return true;
  }
}
