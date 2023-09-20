import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { SignupInput } from '../auth/dto/inputs';
import { User } from '@prisma/client';
import { UserQueryParamsDto } from './dto/args/user-query-params.dto';
import { IUserPagination } from './entities/user-pagination.model';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({
    skip,
    take,
    ...where
  }: UserQueryParamsDto): Promise<IUserPagination> {
    const total = await this.prismaService.user.count({ where });
    const data = await this.prismaService.user.findMany({ skip, take, where });

    return { total, data };
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
