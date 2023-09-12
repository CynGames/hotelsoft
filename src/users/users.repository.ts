import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { SignupInput } from '../auth/dto/inputs';
import { User, ValidRoles } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(roles: ValidRoles[]): Promise<User[]> {
    if (roles.length === 0) return this.prismaService.user.findMany({});

    const where = {
      roles: {
        hasSome: roles,
      },
    };

    return this.prismaService.user.findMany({ where });
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
}
