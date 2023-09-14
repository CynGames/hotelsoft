import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { ValidRoles } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => ID)
  userID: string;

  @Field(() => String)
  firstName?: string;

  @Field(() => String)
  lastName?: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  phoneNumber?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @Field(() => [ValidRoles], { nullable: true })
  roles?: ValidRoles[];
}

registerEnumType(ValidRoles, { name: 'ValidRoles' });
