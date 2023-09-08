import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../database/prisma.service';

@Module({
  providers: [UsersResolver, UsersService, UsersRepository, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
