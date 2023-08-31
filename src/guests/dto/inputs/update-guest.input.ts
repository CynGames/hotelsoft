import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateGuestInput } from './';

@InputType()
export class UpdateGuestInput extends PartialType(CreateGuestInput) {
  @Field(() => Int)
  guestID: number;
}
