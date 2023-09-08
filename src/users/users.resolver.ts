import { Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor() {}

  // @Query(() => [User], { name: 'users' })
  // findAll(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }
  //
  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => ID }) id: string): Promise<User> {
  //   return this.usersService.findOne(id);
  // }
  //
  // @Mutation(() => User)
  // block(@Args('id', { type: () => ID }) id: string) {
  //   return this.usersService.block(id);
  // }
}
