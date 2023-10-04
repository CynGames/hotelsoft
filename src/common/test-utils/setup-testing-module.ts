import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { SeedService } from '../../seed/seed.service';
import { PrismaService } from '../../database/prisma.service';

import { EmptyLogger } from './empty-logger';
import { AppModule } from '../../app.module';
import { useContainer } from 'class-validator';

export async function setupTestingModule(): Promise<{
  app: INestApplication;
  prismaService: PrismaService;
  seedService: SeedService;
}> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useLogger(new EmptyLogger());

  const prismaService = app.get<PrismaService>(PrismaService);
  const seedService = moduleFixture.get<SeedService>(SeedService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.init();
  await seedService.deleteAllData();
  await seedService.seedData();

  return { app, prismaService, seedService };
}
