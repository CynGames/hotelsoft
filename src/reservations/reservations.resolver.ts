import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import {
  CreateReservationInput,
  FindManyReservationInput,
  UpdateReservationInput,
} from './dto/inputs';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

import { User } from '../users/entities/user.entity';
import { Room } from '../rooms/entities/room.entity';
import { Reservation } from './entities/reservation.entity';

import { UsersService } from '../users/users.service';
import { RoomsService } from '../rooms/rooms.service';
import { ReservationsService } from './reservations.service';
import { CurrentUser } from '../auth/decorators/current.user.decorator';
import { ValidRoles } from '@prisma/client';

@Resolver(() => Reservation)
@UseGuards(JwtAuthGuard)
export class ReservationsResolver {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly usersService: UsersService,
    private readonly roomsService: RoomsService,
  ) {}

  @Query(() => [Reservation], { name: 'findAllReservations' })
  findAll(
    @CurrentUser([ValidRoles.Supervisor]) user: User,
  ): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @Query(() => [Reservation], { name: 'findManyReservations' })
  findMany(
    @CurrentUser([ValidRoles.Supervisor]) user: User,
    @Args('params') params: FindManyReservationInput,
  ): Promise<Reservation[]> {
    return this.reservationsService.findMany(params);
  }

  @Query(() => Reservation, { name: 'findOneReservation' })
  findByID(
    @CurrentUser([ValidRoles.Supervisor]) user: User,
    @Args('reservationID', { type: () => ID }) id: string,
  ): Promise<Reservation | Reservation[]> {
    return this.reservationsService.findByID(id);
  }

  @Query(() => Reservation || [Reservation], {
    name: 'findCurrentUserReservation',
  })
  findByCurrentUser(
    @CurrentUser([ValidRoles.Guest]) user: User,
  ): Promise<Reservation | Reservation[]> {
    return this.reservationsService.findByUserID(user.userID);
  }

  @Mutation(() => Reservation, { name: 'createReservation' })
  create(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
    @CurrentUser([ValidRoles.Guest]) user: User,
  ): Promise<Reservation> {
    return this.reservationsService.create(createReservationInput);
  }

  @Mutation(() => Reservation, { name: 'updateReservation' })
  update(
    @Args('reservationID') reservationID: string,
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
    @CurrentUser([ValidRoles.Guest]) user: User,
  ): Promise<Reservation> {
    return this.reservationsService.update(
      reservationID,
      updateReservationInput,
    );
  }

  @Mutation(() => Reservation, { name: 'removeReservation' })
  remove(@Args('reservationID') reservationID: string): Promise<Reservation> {
    return this.reservationsService.remove(reservationID);
  }

  @ResolveField(() => User, { nullable: true })
  async findUser(@Parent() reservation: Reservation): Promise<User> {
    if (!reservation.userID) {
      return null;
    }

    return await this.usersService.findOneByID(reservation.userID);
  }

  @ResolveField(() => Room, { nullable: true })
  async findRoom(@Parent() reservation: Reservation): Promise<Room> {
    if (!reservation.roomID) {
      return null;
    }

    return await this.roomsService.findOneByID(reservation.roomID);
  }
}
