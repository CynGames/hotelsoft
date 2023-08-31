import { Injectable } from '@nestjs/common';
import { Guest } from './entities/guest.entity';
import { CreateGuestInput, UpdateGuestInput } from './dto/inputs';
import { GuestsRepository } from './guests.repository';

@Injectable()
export class GuestsService {
  constructor(private readonly guestsRepository: GuestsRepository) {}

  async getAll(): Promise<Guest[]> {
    return this.guestsRepository.getAll();
  }

  // async findMany(params: any): Promise<Guest[]> {
  //   return this.guestsRepository.findMany(params);
  // }

  async getOne(guestID: number): Promise<Guest> {
    return this.guestsRepository.getByID(guestID);
  }

  async create(createGuestInput: CreateGuestInput): Promise<Guest> {
    return this.guestsRepository.create(createGuestInput);
  }

  async update(
    guestID: number,
    updateGuestInput: UpdateGuestInput,
  ): Promise<Guest> {
    return this.guestsRepository.update(guestID, updateGuestInput);
  }

  async remove(guestID: number) {
    return this.guestsRepository.delete(guestID);
  }
}
