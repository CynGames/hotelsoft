import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { SignupInput } from '../auth/dto/inputs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(signupInput: SignupInput): Promise<User> {
    const newUser = {
      ...signupInput,
      password: bcrypt.hashSync(signupInput.password, 10),
    };

    return this.usersRepository.create(newUser);
  }

  // findAll(): Promise<User[]> {
  //   return [];
  // }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByEmail(email);
    } catch (error) {
      throw new NotFoundException(`${email} not found`);
    }
  }

  async findOneByID(userID: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByID(userID);
    } catch (error) {
      throw new NotFoundException(`${userID} not found`);
    }
  }

  // block(id: string): Promise<User> {
  //   return `This action removes a #${id} user`;
  // }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key ', ''));
    }

    if (error.code === 'error-001') {
      throw new BadRequestException(error.detail.replace('Key ', ''));
    }

    throw new InternalServerErrorException('Please check server logs');
  }
}
