import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { ValidRoles } from '@prisma/client';

@ArgsType()
export class ValidRolesArgs {
  @Field(() => [ValidRoles])
  @IsArray()
  roles: ValidRoles[] = ['Guest'];
}
