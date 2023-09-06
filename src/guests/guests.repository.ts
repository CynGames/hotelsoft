import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Guest } from '@prisma/client';
import {
  CreateGuestInput,
  UpdateGuestInput,
  FindManyGuestInput,
} from './dto/inputs';

@Injectable()
export class GuestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Guest[]> {
    return this.prisma.guest.findMany();
  }

  async getMany(where: FindManyGuestInput): Promise<Guest[]> {
    return this.prisma.guest.findMany({ where });
  }

  async getByID(guestID: string): Promise<Guest> {
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

  async update(guestID: string, data: UpdateGuestInput): Promise<Guest> {
    return this.prisma.guest.update({ data, where: { guestID } });
  }

  async delete(guestID: string) {
    return this.prisma.guest.delete({ where: { guestID } });
  }
}
