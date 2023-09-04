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

  async getAll(): Promise<Guest[]> {
    return this.guestsRepository.getAll();
  }

  async findMany(params: FindManyGuestInput): Promise<Guest[]> {
    const where = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(params).filter(([_, v]) => v !== undefined),
    );

    return this.guestsRepository.findMany(where);
  }

  async getOne(guestID: string): Promise<Guest> {
    return this.guestsRepository.getByID(guestID);
  }

  async create(createGuestInput: CreateGuestInput): Promise<Guest> {
    return this.guestsRepository.create(createGuestInput);
  }

  async update(
    guestID: string,
    updateGuestInput: UpdateGuestInput,
  ): Promise<Guest> {
    return this.guestsRepository.update(guestID, updateGuestInput);
  }

  async remove(guestID: string) {
    return this.guestsRepository.delete(guestID);
  }
}
