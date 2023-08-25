import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Guest {
  @Field(() => Int)
  guestID: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;
}
