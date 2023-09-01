import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

@ObjectType()
export class Guest {
  @Field(() => Int)
  @IsNumber()
  guestID: number;

  @Field(() => String)
  @IsString()
  firstName: string;

  @Field(() => String)
  @IsString()
  lastName: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsPhoneNumber(null)
  phoneNumber: string;
}
