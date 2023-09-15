import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

import {
  CreateReservationInput,
  FindManyReservationInput,
  UpdateReservationInput,
} from './dto/inputs';
import { Reservation } from '@prisma/client';

@Injectable()
export class ReservationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.reservation.findMany();
  }

  findMany(where: FindManyReservationInput) {
    return this.prismaService.reservation.findMany({ where });
  }

  findByReservationID(reservationID: string): Promise<Reservation> {
    return this.prismaService.reservation.findUniqueOrThrow({
      where: { reservationID },
    });
  }

  findByUserID(userID: string): Promise<Reservation[]> {
    return this.prismaService.reservation.findMany({ where: { userID } });
  }

  findByRoomID(roomID: string): Promise<Reservation[]> {
    return this.prismaService.reservation.findMany({
      where: { roomID },
    });
  }

  create(data: CreateReservationInput) {
    return this.prismaService.reservation.create({ data });
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
