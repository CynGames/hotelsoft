import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';
import { PrismaService } from '../database/prisma.service';
import { useContainer } from 'class-validator';
import { ENDPOINT } from '../config/constants';
import * as request from 'supertest';

describe('E2E Users', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  describe('GET USERS', () => {
    const skip = 0;
    const take = 10;

    it('should return an array of users along with the total count', async () => {
      const GET_USERS = `
        query {
          findAllUsers(skip: ${skip}, take: ${take}) {
            total
            data {
              userID
              email
            }
          }
        }
      `;

      const response = await request(app.getHttpServer())
        .post(ENDPOINT)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send({ query: GET_USERS })
        .expect(200);

      const retrievedDataLength = response.body.data.findAllUsers.data.length;
      expect(retrievedDataLength).toEqual(take);
    });
  });
});
