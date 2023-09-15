import { Injectable } from '@nestjs/common';
import {
  CreateReservationInput,
  FindManyReservationInput,
  UpdateReservationInput,
} from './dto/inputs/';

import { Reservation } from './entities/reservation.entity';
import { ReservationsRepository } from './reservations.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.findAll();
  }

  findMany(params: FindManyReservationInput): Promise<Reservation[]> {
    return this.reservationsRepository.findMany(params);
  }

  findByID(reservationID: string): Promise<Reservation> {
    return this.reservationsRepository.findByReservationID(reservationID);
  }

  findByUserID(userID: string): Promise<Reservation[]> {
    return this.reservationsRepository.findByUserID(userID);
  }

  findByRoomID(roomID: string): Promise<Reservation[]> {
    return this.reservationsRepository.findByRoomID(roomID);
  }

  create(createReservationInput: CreateReservationInput): Promise<Reservation> {
    const { userID } = createReservationInput;

    if (userID) {
      const guest = this.usersService.findOneByID(userID);

      if (!guest) {
        throw new Error(`Guest with ID ${userID} not found`);
      }
    }

    return this.reservationsRepository.create(createReservationInput);
  }

  update(
    reservationID: string,
    updateReservationInput: UpdateReservationInput,
  ): Promise<Reservation> {
    return this.reservationsRepository.update(
      reservationID,
      updateReservationInput,
    );
  }

  remove(reservationID: string): Promise<Reservation> {
    return this.reservationsRepository.remove(reservationID);
  }
}
