import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';

import { CurrentUser } from '../auth/decorators/current.user.decorator';
import { ValidRoles } from '@prisma/client';
import { Reservation } from '../reservations/entities/reservation.entity';
import { ReservationsService } from '../reservations/reservations.service';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly reservationsService: ReservationsService,
  ) {}

  @Query(() => [User], { name: 'findAllUsers' })
  findAll(@CurrentUser([ValidRoles.Admin]) user: User): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'findOneUserByEmail' })
  findOneByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Mutation(() => User, { name: 'blockUser' })
  block(
    @CurrentUser([ValidRoles.Supervisor]) user: User,
    @Args('userID', { type: () => ID }) userID: string,
  ) {
    return this.usersService.block(userID);
  }

  @Mutation(() => User, { name: 'unblockUser' })
  unblock(
    @CurrentUser([ValidRoles.Supervisor]) user: User,
    @Args('userID', { type: () => ID }) userID: string,
  ) {
    return this.usersService.unblock(userID);
  }

  @ResolveField(() => [Reservation], { nullable: true })
  findReservation(@Parent() user: User): Promise<Reservation[]> {
    if (!user.userID) {
      return null;
    }

    return this.reservationsService.findByUserID(user.userID);
  }
}
