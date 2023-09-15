import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';
import { ValidRoles } from '@prisma/client';

@ArgsType()
export class ValidRolesArgs {
  @Field(() => [ValidRoles])
  @IsOptional()
  @IsArray()
  roles?: ValidRoles[] = ['Guest'];
}
