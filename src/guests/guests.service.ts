import { Injectable } from '@nestjs/common';
import { CreateGuestInput } from './dto/create-guest.input';
import { UpdateGuestInput } from './dto/update-guest.input';

@Injectable()
export class GuestsService {
  guests = [
    {
      guestID: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: '',
      phone: '',
    },
    {
      guestID: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: '',
      phone: '',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createGuestInput: CreateGuestInput) {
    return;
  }

  findAll() {
    return this.guests;
  }

  findOne(id: number) {
    return this.guests.find((guest) => guest.guestID === id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateGuestInput: UpdateGuestInput) {
    return `This action removes a #${id} guest`;
  }

  remove(id: number) {
    return `This action removes a #${id} guest`;
  }
}
