import { GenericPagination } from '../../common/generic-pagination.model';
import { Room } from './room.entity';

export const RoomPagination = GenericPagination(Room, 'RoomPagination');

export interface IRoomPagination {
  total: number;
  data: Room[];
}
