import { INestApplication } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { SeedService } from './seed.service';

import {
  setupTestingModule,
  sendGraphQLRequest,
  teardownTestEnvironment,
} from '../common/test-utils';

describe('Seed Resolver', () => {
  let app: INestApplication;

  let prismaService: PrismaService;
  let seedService: SeedService;

  beforeAll(async () => {
    ({ app, prismaService, seedService } = await setupTestingModule());
  });

  afterAll(async () => {
    await teardownTestEnvironment(app, prismaService, seedService);
  });

  describe('SEED', () => {
    it('should execute seed', async () => {
      const SEED_DB = `
      mutation SeedDB {
        executeSeed
      }`;

      const { executeSeed } = await sendGraphQLRequest({ app, query: SEED_DB });

      expect(executeSeed).toBeTruthy();
    });
  });
});
