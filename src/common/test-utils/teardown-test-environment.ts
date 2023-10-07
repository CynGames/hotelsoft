import { SeedService } from '../../seed/seed.service';
import { PrismaService } from '../../database/prisma.service';
import { INestApplication } from '@nestjs/common';

export async function teardownTestEnvironment(
  app: INestApplication,
  prismaService: PrismaService,
  seedService: SeedService,
) {
  await seedService.deleteAllData();
  await prismaService.$disconnect();
  await app.close();
}
