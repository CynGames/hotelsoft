import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  CreateReservationInput,
  FindManyReservationInput,
  UpdateReservationInput,
} from './dto/inputs';

@Injectable()
export class ReservationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.reservation.findMany();
  }

  getMany(where: FindManyReservationInput) {
    return this.prisma.reservation.findMany({ where });
  }

  getByID(reservationID: string) {
    return this.prisma.reservation.findUniqueOrThrow({
      where: { reservationID },
    });
  }

  create(data: CreateReservationInput) {
    return this.prisma.reservation.create({
      data: {
        guestID: data.guestID,
        roomID: data.roomID,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        status: data.status,
      },
    });
  }

  update(reservationID: string, data: UpdateReservationInput) {
    return this.prisma.reservation.update({ data, where: { reservationID } });
  }

  remove(reservationID: string) {
    return this.prisma.reservation.delete({ where: { reservationID } });
  }
}
