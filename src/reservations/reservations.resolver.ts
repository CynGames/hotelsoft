import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import {
  CreateReservationInput,
  FindManyReservationInput,
  UpdateReservationInput,
} from './dto/inputs';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [Reservation], { name: 'getReservations' })
  getAll(): Promise<Reservation[]> {
    return this.reservationsService.getAll();
  }

  @Query(() => [Reservation], { name: 'getManyReservations' })
  getMany(
    @Args('params') params: FindManyReservationInput,
  ): Promise<Reservation[]> {
    return this.reservationsService.getMany(params);
  }

  @Query(() => Reservation, { name: 'getOneReservation' })
  getByID(
    @Args('reservationID', { type: () => ID }) id: string,
  ): Promise<Reservation> {
    return this.reservationsService.getByID(id);
  }

  @Mutation(() => Reservation, { name: 'createReservation' })
  create(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ): Promise<Reservation> {
    return this.reservationsService.create(createReservationInput);
  }

  @Mutation(() => Reservation, { name: 'updateReservation' })
  update(
    @Args('reservationID') reservationID: string,
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
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
  async getGuest(@Parent() reservation: Reservation): Promise<User> {
    if (!reservation.userID) {
      return null;
    }

    return await this.usersService.findOneByID(reservation.userID);
  }
}
