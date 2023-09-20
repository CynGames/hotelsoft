import { GenericPagination } from '../../common/generic-pagination.model';
import { User } from './user.entity';

export const UserPagination = GenericPagination(User, 'UserPagination');

export interface IUserPagination {
  total: number;
  data: User[];
}
