import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ReservationsService } from './reservations.service';
import { ReservationsResolver } from './reservations.resolver';
import { ReservationsRepository } from './reservations.repository';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [
    ReservationsRepository,
    ReservationsResolver,
    ReservationsService,
    PrismaService,
  ],
  imports: [UsersModule],
  exports: [PrismaService, ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
