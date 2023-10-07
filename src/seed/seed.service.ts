import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../database/prisma.service';
import { Room, User, ValidRoles } from '@prisma/client';

import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { ReservationsRepository } from '../reservations/reservations.repository';
import { RoomsRepository } from '../rooms/rooms.repository';

import { SEED_USERS } from '../database/data/userData';
import { SEED_ROOMS } from '../database/data/roomData';
import { SEED_RESERVATIONS } from '../database/data/reservationData';

@Injectable()
export class SeedService {
  private readonly isProd: boolean;

  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
    private readonly roomsRepository: RoomsRepository,
    private readonly reservationRepository: ReservationsRepository,
    private readonly prismaService: PrismaService,
  ) {
    this.isProd = configService.get('NODE_ENV') === 'prod';
  }

  async executeSeed() {
    this.checkIfProd();

    await this.deleteAllData();
    await this.seedData();

    return true;
  }

  async seedData() {
    const users = await this.loadUsers();
    const rooms = await this.loadRooms();
    await this.loadReservations(users, rooms);
  }

  async deleteAllData() {
    await this.prismaService.reservation.deleteMany({});
    await this.prismaService.user.deleteMany({});
    await this.prismaService.room.deleteMany({});
  }

  async loadUsers(): Promise<User[]> {
    const users = [];
    const adminUser = {
      firstName: 'Tomas',
      lastName: 'Leguizamon',
      email: 'tomasm.leguizamon@gmail.com',
      password: '123456',
      phoneNumber: '+48 (601) 733-5229',
      isActive: true,
      roles: [ValidRoles.Guest, ValidRoles.Supervisor, ValidRoles.Admin],
    };

    await this.usersService.create(adminUser);

    for (const user of SEED_USERS) {
      users.push(await this.usersRepository.create(user));
    }

    if (users.length !== SEED_USERS.length)
      throw new InternalServerErrorException('Cannot load users.');

    return users;
  }

  async loadRooms(): Promise<Room[]> {
    const rooms = [];

    for (const room of SEED_ROOMS) {
      rooms.push(await this.roomsRepository.create(room));
    }

    if (rooms.length !== SEED_ROOMS.length)
      throw new InternalServerErrorException('Cannot load rooms.');

    return rooms;
  }

  async loadReservations(users: User[], rooms: Room[]): Promise<void> {
    const reservations = [];
    let isFirstIteration = true;

    for (const reservation of SEED_RESERVATIONS) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];

      reservation.roomID = randomRoom.roomID;
      reservation.userID = isFirstIteration
        ? await this.getAdminUser().then((value) => value.userID)
        : randomUser.userID;

      reservations.push(await this.reservationRepository.create(reservation));

      isFirstIteration = false;
    }

    if (reservations.length !== SEED_RESERVATIONS.length)
      throw new InternalServerErrorException('Cannot load reservations.');
  }

  checkIfProd(): void {
    if (this.isProd)
      throw new UnauthorizedException('You cannot seed in production');
  }

  async getAdminUser(): Promise<User> {
    return await this.usersRepository.findOneByEmail(
      'tomasm.leguizamon@gmail.com',
    );
  }
}
