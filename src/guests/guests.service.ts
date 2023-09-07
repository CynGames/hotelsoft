import { Injectable } from '@nestjs/common';
import { Guest } from './entities/guest.entity';
import {
  CreateGuestInput,
  UpdateGuestInput,
  FindManyGuestInput,
} from './dto/inputs';
import { GuestsRepository } from './guests.repository';

@Injectable()
export class GuestsService {
  constructor(private readonly guestsRepository: GuestsRepository) {}

  getAll(): Promise<Guest[]> {
    return this.guestsRepository.getAll();
  }

  getMany(params: FindManyGuestInput): Promise<Guest[]> {
    const where = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(params).filter(([_, v]) => v !== undefined),
    );

    return this.guestsRepository.getMany(where);
  }

  async getOne(guestID: string): Promise<Guest> {
    return this.guestsRepository.getByID(guestID);
  }

  create(createGuestInput: CreateGuestInput): Promise<Guest> {
    return this.guestsRepository.create(createGuestInput);
  }

  update(guestID: string, updateGuestInput: UpdateGuestInput): Promise<Guest> {
    return this.guestsRepository.update(guestID, updateGuestInput);
  }

  remove(guestID: string) {
    return this.guestsRepository.delete(guestID);
  }
}
