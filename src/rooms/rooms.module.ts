import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { RoomsRepository } from './rooms.repository';
import { PrismaService } from '../database/prisma.service';

@Module({
  providers: [PrismaService, RoomsResolver, RoomsService, RoomsRepository],
  exports: [RoomsService, RoomsRepository],
})
export class RoomsModule {}
