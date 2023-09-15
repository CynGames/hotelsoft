import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

import { ReservationsService } from './reservations.service';
import { ReservationsResolver } from './reservations.resolver';
import { ReservationsRepository } from './reservations.repository';

import { UsersModule } from '../users/users.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  providers: [
    ReservationsRepository,
    ReservationsResolver,
    ReservationsService,
    PrismaService,
  ],
  imports: [forwardRef(() => UsersModule), RoomsModule],
  exports: [PrismaService, ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
