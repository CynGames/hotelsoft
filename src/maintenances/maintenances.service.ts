import { Injectable } from '@nestjs/common';
import { CreateMaintenanceInput } from './dto/create-maintenance.input';
import { UpdateMaintenanceInput } from './dto/update-maintenance.input';

@Injectable()
export class MaintenancesService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createMaintenanceInput: CreateMaintenanceInput) {
    return 'This action adds a new maintenance';
  }

  findAll() {
    return `This action returns all maintenances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maintenance`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateMaintenanceInput: UpdateMaintenanceInput) {
    return `This action updates a #${id} maintenance`;
  }

  remove(id: number) {
    return `This action removes a #${id} maintenance`;
  }
}
