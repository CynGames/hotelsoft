import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber } from 'class-validator';

@ObjectType()
export class Guest {
  @Field(() => Int)
  guestID: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsPhoneNumber(null)
  phoneNumber: string;
}
