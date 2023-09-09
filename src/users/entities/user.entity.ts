import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Role } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  userID: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // TODO: Fix this
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field(() => Role, { nullable: true })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

registerEnumType(Role, {
  name: 'UserRole',
  description: 'The role of the user',
});
