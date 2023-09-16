import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../database/prisma.service';
import { ReservationsModule } from '../reservations/reservations.module';

@Module({
  providers: [UsersResolver, UsersService, UsersRepository, PrismaService],
  imports: [forwardRef(() => ReservationsModule)],
  exports: [PrismaService, UsersService, UsersRepository],
})
export class UsersModule {}
