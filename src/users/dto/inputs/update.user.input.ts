import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create.user.input';
import { IsArray, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ValidRoles } from '@prisma/client';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsUUID()
  userID: string;

  @Field(() => [ValidRoles], { nullable: true })
  @IsArray()
  @IsOptional()
  roles?: ValidRoles[];

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
