import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { SignupInput } from '../auth/dto/inputs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOneByEmail(email: string): Promise<User> {
    try {
      return this.usersRepository.findOneByEmail(email);
    } catch (error) {
      throw new NotFoundException(`${email} not found`);
    }
  }

  findOneByID(userID: string): Promise<User> {
    try {
      return this.usersRepository.findOneByID(userID);
    } catch (error) {
      throw new NotFoundException(`${userID} not found`);
    }
  }

  create(signupInput: SignupInput): Promise<User> {
    const newUser = {
      ...signupInput,
      password: bcrypt.hashSync(signupInput.password, 10),
    };

    return this.usersRepository.create(newUser);
  }

  block(id: string): Promise<User> {
    return this.usersRepository.update(id, { isActive: true });
  }

  unblock(id: string): Promise<User> {
    return this.usersRepository.update(id, { isActive: false });
  }
}
