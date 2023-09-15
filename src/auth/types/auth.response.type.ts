import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

import { User } from '../../users/entities/user.entity';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  @IsString()
  token: string;

  @Field(() => User)
  user: User;
}
