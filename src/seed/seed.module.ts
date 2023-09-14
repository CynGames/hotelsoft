import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { ReservationsModule } from '../reservations/reservations.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ConfigModule, UsersModule, ReservationsModule, RoomsModule],
})
export class SeedModule {}
