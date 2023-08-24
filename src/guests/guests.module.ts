import { Module } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { GuestsResolver } from './guests.resolver';

@Module({
  providers: [GuestsResolver, GuestsService],
})
export class GuestsModule {}
