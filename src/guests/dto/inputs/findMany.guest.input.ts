import { InputType, PartialType } from '@nestjs/graphql';
import { Guest } from '../../entities/guest.entity';

@InputType()
export class FindManyGuestInput extends PartialType(Guest, InputType) {}
