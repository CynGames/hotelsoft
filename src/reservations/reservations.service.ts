import { Injectable } from '@nestjs/common';
import {
  CreateReservationInput,
  FindManyReservationInput,
  UpdateReservationInput,
} from './dto/inputs/';
import { GuestsRepository } from '../guests/guests.repository';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly guestsRepository: GuestsRepository,
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  getAll(): Promise<Reservation[]> {
    return this.reservationsRepository.getAll();
  }

  getMany(params: FindManyReservationInput): Promise<Reservation[]> {
    return this.reservationsRepository.getMany(params);
  }

  getByID(reservationID: string): Promise<Reservation> {
    return this.reservationsRepository.getByID(reservationID);
  }

  create(createReservationInput: CreateReservationInput): Promise<Reservation> {
    const { guestID } = createReservationInput;

    if (guestID) {
      const guest = this.guestsRepository.getByID(guestID);

      if (!guest) {
        throw new Error(`Guest with ID ${guestID} not found`);
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
