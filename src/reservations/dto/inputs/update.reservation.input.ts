import { CreateReservationInput } from './create.reservation.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReservationInput extends PartialType(
  CreateReservationInput,
) {}
