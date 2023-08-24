import { Module } from '@nestjs/common';
import { MaintenancesService } from './maintenances.service';
import { MaintenancesResolver } from './maintenances.resolver';

@Module({
  providers: [MaintenancesResolver, MaintenancesService],
})
export class MaintenancesModule {}
