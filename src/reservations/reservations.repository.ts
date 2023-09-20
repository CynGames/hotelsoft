import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

import { CreateReservationInput, UpdateReservationInput } from './dto/inputs';
import { Reservation } from '@prisma/client';
import { ReservationQueryParamsDto } from './dto/args/reservation-query-params.dto';
import { IReservationPagination } from './entities/reservation-pagination.model';

@Injectable()
export class ReservationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({
    skip,
    take,
    ...where
  }: ReservationQueryParamsDto): Promise<IReservationPagination> {
    const total = await this.prismaService.reservation.count({ where });
    const data = await this.prismaService.reservation.findMany({
      skip,
      take,
      where,
    });

    return { total, data };
  }

  findByReservationID(reservationID: string): Promise<Reservation> {
    return this.prismaService.reservation.findUniqueOrThrow({
      where: { reservationID },
    });
  }

  async findByUserID(userID: string): Promise<Reservation[]> {
    return this.prismaService.reservation.findMany({ where: { userID } });
  }

  findByRoomID(roomID: string): Promise<Reservation[]> {
    return this.prismaService.reservation.findMany({
      where: { roomID },
    });
  }

  create(data: CreateReservationInput) {
    // @ts-ignore
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
