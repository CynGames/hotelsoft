import { InputType, PartialType } from '@nestjs/graphql';
import { CreateGuestInput } from './create.guest.input';

@InputType()
export class UpdateGuestInput extends PartialType(CreateGuestInput) {}
