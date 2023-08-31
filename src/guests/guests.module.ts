import { Module } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { GuestsResolver } from './guests.resolver';
import { PrismaService } from '../database/prisma.service';

@Module({
  providers: [GuestsService, GuestsResolver, PrismaService],
})
export class GuestsModule {}
