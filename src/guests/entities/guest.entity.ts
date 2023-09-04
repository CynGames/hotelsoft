import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

@ObjectType()
export class Guest {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  guestID: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  lastName?: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String, { nullable: true })
  @IsPhoneNumber(null)
  @IsOptional()
  phoneNumber?: string;
}
