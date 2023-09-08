import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { SignupInput } from '../auth/dto/inputs/signup.input';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(signupInput: SignupInput): Promise<User> {
    return this.usersRepository.create({ ...signupInput });
  }

  // findAll(): Promise<User[]> {
  //   return [];
  // }
  //
  // findOne(id: number): Promise<User> {
  //   return `This action returns a #${id} user`;
  // }
  //
  // block(id: string): Promise<User> {
  //   return `This action removes a #${id} user`;
  // }
}
