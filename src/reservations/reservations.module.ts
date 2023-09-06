import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ReservationsService } from './reservations.service';
import { ReservationsResolver } from './reservations.resolver';
import { ReservationsRepository } from './reservations.repository';
import { GuestsRepository } from '../guests/guests.repository';
import { GuestsService } from '../guests/guests.service';

@Module({
  providers: [
    GuestsRepository,
    GuestsService,
    ReservationsRepository,
    ReservationsResolver,
    ReservationsService,
    PrismaService,
  ],
})
export class ReservationsModule {}
