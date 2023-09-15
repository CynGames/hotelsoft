import { forwardRef, Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { RoomsRepository } from './rooms.repository';
import { PrismaService } from '../database/prisma.service';
import { ReservationsModule } from '../reservations/reservations.module';

@Module({
  providers: [PrismaService, RoomsResolver, RoomsService, RoomsRepository],
  imports: [forwardRef(() => ReservationsModule)],
  exports: [RoomsService, RoomsRepository],
})
export class RoomsModule {}
