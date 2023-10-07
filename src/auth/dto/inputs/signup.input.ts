import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from '../../../users/entities/user.entity';
import { ValidRoles } from '@prisma/client';

@InputType()
export class SignupInput extends PartialType(User) {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => [ValidRoles], { nullable: true })
  roles?: ValidRoles[];
}
