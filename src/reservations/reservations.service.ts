import { Injectable } from '@nestjs/common';
import {
  CreateReservationInput,
  FindManyReservationInput,
  UpdateReservationInput,
} from './dto/inputs/';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from './entities/reservation.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly usersService: UsersService,
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
