import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Query(() => [User], { name: 'users' })
  // findAll(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }

  @Query(() => User, { name: 'findUserByEmail' })
  findOneByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  // @Mutation(() => User)
  // block(@Args('id', { type: () => ID }) id: string) {
  //   return this.usersService.block(id);
  // }
}
