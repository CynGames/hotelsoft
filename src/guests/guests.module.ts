import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { GuestsService } from './guests.service';
import { GuestsResolver } from './guests.resolver';
import { GuestsRepository } from './guests.repository';

@Module({
  providers: [GuestsService, GuestsResolver, GuestsRepository, PrismaService],
})
export class GuestsModule {}
