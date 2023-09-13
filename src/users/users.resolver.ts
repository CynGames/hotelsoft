import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { ValidRolesArgs } from './dto/args/roles.arg';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { CurrentUser } from '../auth/decorators/current.user.decorator';
import { ValidRoles } from '@prisma/client';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.ADMIN]) user: User,
  ): Promise<User[]> {
    return this.usersService.findAll(validRoles.roles);
  }

  @Query(() => User, { name: 'findUserByEmail' })
  async findOneByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  // TODO
  // Hacer findeone por id, can pipe validator (parseUUIDPipe), current user decorator.

  // @Mutation(() => User)
  // block(@Args('id', { type: () => ID }) id: string) {
  //   return this.usersService.block(id);
  // }
}
