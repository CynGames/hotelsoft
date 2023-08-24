import { Injectable } from '@nestjs/common';
import { CreateGuestInput } from './dto/create-guest.input';
import { UpdateGuestInput } from './dto/update-guest.input';

@Injectable()
export class GuestsService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createGuestInput: CreateGuestInput) {
    return 'This action adds a new guest';
  }

  findAll() {
    return `This action returns all guests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guest`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateGuestInput: UpdateGuestInput) {
    return `This action updates a #${id} guest`;
  }

  remove(id: number) {
    return `This action removes a #${id} guest`;
  }
}
