import { INestApplication } from '@nestjs/common';

import { SeedService } from './seed.service';
import { PrismaService } from '../database/prisma.service';

import { SEED_USERS } from '../database/data/userData';
import { SEED_ROOMS } from '../database/data/roomData';
import { SEED_RESERVATIONS } from '../database/data/reservationData';

import {
  setupTestingModule,
  teardownTestEnvironment,
} from '../common/test-utils';

describe('Seed Service', () => {
  let app: INestApplication;

  let prismaService: PrismaService;
  let seedService: SeedService;

  beforeAll(async () => {
    ({ app, prismaService, seedService } = await setupTestingModule());
  });

  afterAll(async () => {
    await teardownTestEnvironment(app, prismaService, seedService);
  });

  it('should correctly seed users', async () => {
    const users = await prismaService.user.findMany();
    expect(users.length - 1).toEqual(SEED_USERS.length);
  });

  it('should correctly seed rooms', async () => {
    const rooms = await prismaService.room.findMany();
    expect(rooms.length).toEqual(SEED_ROOMS.length);
  });

  it('should correctly seed reservations', async () => {
    const reservations = await prismaService.reservation.findMany();
    expect(reservations.length).toEqual(SEED_RESERVATIONS.length);
  });
});
