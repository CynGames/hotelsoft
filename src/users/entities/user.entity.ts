import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { ValidRoles } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => ID)
  userID: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  // TODO: Fix this
  @Field(() => String)
  password: string;

  @Field(() => [ValidRoles], { nullable: true })
  roles?: ValidRoles[];

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}

registerEnumType(ValidRoles, { name: 'ValidRoles' });

// registerEnumType(ValidRoles, {
//   name: 'ValidUserRole',
//   description: 'The role of the user',
// });
