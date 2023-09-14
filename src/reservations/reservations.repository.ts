import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  CreateReservationInput,
  FindManyReservationInput,
  UpdateReservationInput,
} from './dto/inputs';

@Injectable()
export class ReservationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.reservation.findMany();
  }

  getMany(where: FindManyReservationInput) {
    return this.prismaService.reservation.findMany({ where });
  }

  getByID(reservationID: string) {
    return this.prismaService.reservation.findUniqueOrThrow({
      where: { reservationID },
    });
  }

  create(data: CreateReservationInput) {
    return this.prismaService.reservation.create({
      data: {
        userID: data.userID,
        roomID: data.roomID,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        status: data.status,
      },
    });
  }

  update(reservationID: string, data: UpdateReservationInput) {
    return this.prismaService.reservation.update({
      data,
      where: { reservationID },
    });
  }

  remove(reservationID: string) {
    return this.prismaService.reservation.delete({ where: { reservationID } });
  }
}
