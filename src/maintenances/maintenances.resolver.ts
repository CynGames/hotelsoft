import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MaintenancesService } from './maintenances.service';
import { Maintenance } from './entities/maintenance.entity';
import { CreateMaintenanceInput } from './dto/create-maintenance.input';
import { UpdateMaintenanceInput } from './dto/update-maintenance.input';

@Resolver(() => Maintenance)
export class MaintenancesResolver {
  constructor(private readonly maintenancesService: MaintenancesService) {}

  @Mutation(() => Maintenance)
  createMaintenance(
    @Args('createMaintenanceInput')
    createMaintenanceInput: CreateMaintenanceInput,
  ) {
    return this.maintenancesService.create(createMaintenanceInput);
  }

  @Query(() => [Maintenance], { name: 'maintenances' })
  findAll() {
    return this.maintenancesService.findAll();
  }

  @Query(() => Maintenance, { name: 'maintenance' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.maintenancesService.findOne(id);
  }

  @Mutation(() => Maintenance)
  updateMaintenance(
    @Args('updateMaintenanceInput')
    updateMaintenanceInput: UpdateMaintenanceInput,
  ) {
    return this.maintenancesService.update(
      updateMaintenanceInput.id,
      updateMaintenanceInput,
    );
  }

  @Mutation(() => Maintenance)
  removeMaintenance(@Args('id', { type: () => Int }) id: number) {
    return this.maintenancesService.remove(id);
  }
}
