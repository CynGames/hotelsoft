import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { SignupInput } from '../auth/dto/inputs';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  findOneByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({ where: { email } });
  }

  findOneByID(userID: string): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({ where: { userID } });
  }

  create(data: SignupInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  update(userID: string, data: Partial<User>): Promise<User> {
    return this.prismaService.user.update({ where: { userID }, data });
  }
}
