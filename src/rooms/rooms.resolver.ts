import {
  ID,
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { ReservationsService } from '../reservations/reservations.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { FindManyRoomInput } from './dto/findMany.room.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { CurrentUser } from '../auth/decorators/current.user.decorator';
import { ValidRoles } from '@prisma/client';
import { User } from '../users/entities/user.entity';

@Resolver(() => Room)
@UseGuards(JwtAuthGuard)
export class RoomsResolver {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly reservationsService: ReservationsService,
  ) {}

  @Query(() => [Room], { name: 'findAllRooms' })
  findAll(@CurrentUser([ValidRoles.Supervisor]) user: User): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Query(() => [Room], { name: 'findManyRooms' })
  findMany(
    @CurrentUser([ValidRoles.Supervisor]) user: User,
    @Args('params') params: FindManyRoomInput,
  ): Promise<Room[]> {
    return this.roomsService.findMany(params);
  }

  @Query(() => Room, { name: 'findOneRoom' })
  findByID(@Args('roomID', { type: () => ID }) id: string): Promise<Room> {
    return this.roomsService.findOneByID(id);
  }

  @Mutation(() => Room, { name: 'createRoom' })
  create(
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
  ): Promise<Room> {
    return this.roomsService.create(createRoomInput);
  }

  @Mutation(() => Room, { name: 'updateRoom' })
  update(
    @CurrentUser([ValidRoles.Supervisor]) user: User,
    @Args('updateRoomInput') updateRoomInput: UpdateRoomInput,
  ) {
    return this.roomsService.update(updateRoomInput);
  }

  @Mutation(() => Room, { name: 'removeRoom' })
  remove(
    @CurrentUser([ValidRoles.Supervisor]) user: User,
    @Args('roomID') roomID: string,
  ) {
    return this.roomsService.remove(roomID);
  }

  @ResolveField(() => [Reservation], { nullable: true })
  async findReservation(@Parent() room: Room): Promise<Reservation[]> {
    console.log(room);

    if (!room.roomID) {
      return null;
    }

    return await this.reservationsService.findByRoomID(room.roomID);
  }
}
