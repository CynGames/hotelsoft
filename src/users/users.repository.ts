import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Role, User } from '@prisma/client';
import { SignupInput } from '../auth/dto/inputs/signup.input';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: SignupInput): Promise<User> {
    const userData = {
      ...data,
      role: data.role ?? Role.Guest,
      isActive: data.isActive ?? true,
    };

    return this.prismaService.user.create({ data: userData });
  }
}
