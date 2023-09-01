import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { GuestsService } from './guests.service';
import { Guest } from './entities/guest.entity';
import {
  CreateGuestInput,
  FindManyGuestInput,
  UpdateGuestInput,
} from './dto/inputs';

@Resolver(() => Guest)
export class GuestsResolver {
  constructor(private readonly guestsService: GuestsService) {}

  @Query(() => [Guest], { name: 'guests' })
  async getAll(): Promise<Guest[]> {
    return this.guestsService.getAll();
  }

  @Query(() => [Guest], { name: 'guestsWithParams' })
  async findMany(@Args('params') params: FindManyGuestInput): Promise<Guest[]> {
    return this.guestsService.findMany(params);
  }

  @Query(() => Guest, { name: 'guest' })
  async getOne(@Args('id', { type: () => Int }) id: number) {
    return this.guestsService.getOne(id);
  }

  @Mutation(() => Guest)
  async create(
    @Args('createGuestInput') createGuestInput: CreateGuestInput,
  ): Promise<Guest> {
    return this.guestsService.create(createGuestInput);
  }

  @Mutation(() => Guest)
  async update(
    @Args('guestID') guestID: number,
    @Args('updateGuestInput') updateGuestInput: UpdateGuestInput,
  ): Promise<Guest> {
    return this.guestsService.update(guestID, updateGuestInput);
  }

  @Mutation(() => Guest)
  async remove(@Args('id', { type: () => Int }) id: number) {
    return this.guestsService.remove(id);
  }
}
