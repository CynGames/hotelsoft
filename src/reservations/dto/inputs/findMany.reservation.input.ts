import { InputType, PartialType } from '@nestjs/graphql';
import { Reservation } from '../../entities/reservation.entity';

@InputType()
export class FindManyReservationInput extends PartialType(
  Reservation,
  InputType,
) {}
