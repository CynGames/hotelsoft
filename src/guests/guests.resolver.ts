import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GuestsService } from './guests.service';
import { Guest } from './entities/guest.entity';

@Resolver(() => Guest)
export class GuestsResolver {
  constructor(private readonly guestsService: GuestsService) {}

  @Mutation(() => Guest)
  async createGuest(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('phone') phone: string,
  ): Promise<Guest> {
    return this.guestsService.createGuest(firstName, lastName, email, phone);
  }

  @Mutation(() => Guest)
  async updateGuest(
    @Args('guestID') guestID: number,
    @Args('email') email: string,
  ): Promise<Guest> {
    return this.guestsService.updateGuest(guestID, email);
  }

  @Query(() => [Guest], { name: 'guests' })
  async getGuests(): Promise<Guest[]> {
    return this.guestsService.getGuests();
  }

  // @Query(() => Guest, { name: 'guest' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.guestsService.findOne(id);
  // }
  //
  // @Mutation(() => Guest)
  // updateGuest(@Args('updateGuestInput') updateGuestInput: UpdateGuestInput) {
  //   return this.guestsService.update(updateGuestInput.id, updateGuestInput);
  // }
  //
  // @Mutation(() => Guest)
  // removeGuest(@Args('id', { type: () => Int }) id: number) {
  //   return this.guestsService.remove(id);
  // }
}
