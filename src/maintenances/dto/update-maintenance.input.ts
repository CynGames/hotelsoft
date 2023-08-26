import { CreateMaintenanceInput } from './create-maintenance.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMaintenanceInput extends PartialType(
  CreateMaintenanceInput,
) {
  @Field(() => Int)
  id: number;
}
