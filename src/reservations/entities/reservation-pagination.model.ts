import { GenericPagination } from '../../common/generic-pagination.model';
import { Reservation } from './reservation.entity';

export const ReservationPagination = GenericPagination(
  Reservation,
  'ReservationPagination',
);

export interface IReservationPagination {
  total: number;
  data: Reservation[];
}
