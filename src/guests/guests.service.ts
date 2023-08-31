import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Guest } from './entities/guest.entity';

@Injectable()
export class GuestsService {
  constructor(private readonly prisma: PrismaService) {}

  async getGuests(): Promise<Guest[]> {
    return this.prisma.guest.findMany();
  }

  // input?
  async createGuest(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
  ): Promise<Guest> {
    return this.prisma.guest.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
      },
    });
  }

  async updateGuest(guestID: number, email: string): Promise<Guest> {
    return this.prisma.guest.update({
      where: { guestID },
      data: { email },
    });
  }
}
