import { INestApplication } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { SeedService } from '../seed/seed.service';

import {
  setupTestingModule,
  loginTestQuery,
  sendGraphQLRequest,
  teardownTestEnvironment,
} from '../common/test-utils';

describe('Users Resolver', () => {
  let app: INestApplication;

  let prismaService: PrismaService;
  let seedService: SeedService;
  let jwtToken: string;

  beforeAll(async () => {
    ({ app, prismaService, seedService } = await setupTestingModule());

    jwtToken = await loginTestQuery(app);
  });

  afterAll(async () => {
    await teardownTestEnvironment(app, prismaService, seedService);
  });

  describe('GET ALL USERS', () => {
    it('should match the taken elements from pagination', async () => {
      const GET_USERS = `
        query FindAllUsers($skip: Int, $take: Int) {
          findAllUsers(skip: $skip, take: $take) {
            total
            data {
              userID
            }
          }
        }
      `;

      const variables = {
        skip: 0,
        take: 10,
      };

      const { findAllUsers } = await sendGraphQLRequest({
        app,
        query: GET_USERS,
        jwtToken,
        variables,
      });

      expect(findAllUsers.data).toHaveLength(variables.take);
    });

    it('should respond with array of firstName, lastName and email', async () => {
      const GET_USERS = `
        query FindAllUsers($skip: Int, $take: Int) {
          findAllUsers(skip: $skip, take: $take) {
            data {
              firstName
              lastName
              email
            }
          }
        }
      `;

      const variables = {
        skip: 0,
        take: 10,
      };

      const { findAllUsers } = await sendGraphQLRequest({
        app,
        query: GET_USERS,
        jwtToken,
        variables,
      });

      const randomValue = Math.floor(Math.random() * variables.take);

      expect(findAllUsers.data[randomValue].firstName).toBeTruthy();
      expect(findAllUsers.data[randomValue].lastName).toBeTruthy();
      expect(findAllUsers.data[randomValue].email).toBeTruthy();
    });

    it('should filter by email', async () => {
      const GET_USERS = `
        query FindAllUsers($skip: Int, $take: Int, $email: String) {
          findAllUsers(skip: $skip, take: $take, email: $email) {
            data {
              firstName
              lastName
              email
            }
          }
        }`;

      const variables = {
        skip: 0,
        take: 10,
        email: 'tomasm.leguizamon@gmail.com',
      };

      const { findAllUsers } = await sendGraphQLRequest({
        app,
        query: GET_USERS,
        jwtToken,
        variables,
      });

      expect(findAllUsers.data).toHaveLength(1);
      expect(findAllUsers.data[0].lastName).toBeTruthy();
      expect(findAllUsers.data[0].email).toBeTruthy();
      expect(findAllUsers.data[0].email).toBeTruthy();
    });

    it('should be able to perform nested queries for reservations', async () => {
      const GET_USERS = `
        query FindAllUsers($email: String) {
          findAllUsers(email: $email) {
            data {
              findReservation {
                status
              }
            }
          }
        }`;

      const variables = {
        email: 'tomasm.leguizamon@gmail.com',
      };

      const { findAllUsers } = await sendGraphQLRequest({
        app,
        query: GET_USERS,
        variables,
        jwtToken,
      });

      expect(findAllUsers.data[0].findReservation[0].status).toBeDefined();
    });

    it('should be able to perform nested queries for rooms', async () => {
      const GET_USERS = `
        query FindAllUsers($email: String) {
          findAllUsers(email: $email) {
            data {
              findReservation {
                status
                
                findRoom {
                  status
                }
              }
            }
          }
        }`;

      const variables = {
        email: 'tomasm.leguizamon@gmail.com',
      };

      const { findAllUsers } = await sendGraphQLRequest({
        app,
        query: GET_USERS,
        variables,
        jwtToken,
      });

      expect(
        findAllUsers.data[0].findReservation[0].findRoom.status,
      ).toBeDefined();
    });

    it('should be unauthorized', async () => {
      const GET_USERS = `
        query FindAllUsers {
          findAllUsers {
            data {
              firstName
              lastName
              email
            }
          }
        }`;

      const { errors } = await sendGraphQLRequest({
        app,
        query: GET_USERS,
        isError: true,
      });

      expect(errors[0].message).toContain('Unauthorized');
    });
  });

  describe('GET ONE BY EMAIL', () => {
    it('should filter by email', async () => {
      const GET_USER_BY_MAIL = `
        query FindOneUserByEmail($email: String!) {
          findOneUserByEmail(email: $email) {
            firstName
            lastName
            email
            findReservation {
              status
        
              findRoom {
                status
              }
            }
          }
        }`;

      const variables = {
        email: 'tomasm.leguizamon@gmail.com',
      };

      const { findOneUserByEmail } = await sendGraphQLRequest({
        app,
        query: GET_USER_BY_MAIL,
        jwtToken,
        variables,
      });

      expect(findOneUserByEmail.firstName).toBeTruthy();
      expect(findOneUserByEmail.lastName).toBeTruthy();
      expect(findOneUserByEmail.email).toBeTruthy();
    });

    it('should be able to perform nested queries for reservations', async () => {
      const GET_USER_BY_MAIL = `
        query FindOneUserByEmail($email: String!) {
          findOneUserByEmail(email: $email) {
            findReservation {
              status
            }
          }
        }`;

      const variables = {
        email: 'tomasm.leguizamon@gmail.com',
      };

      const { findOneUserByEmail } = await sendGraphQLRequest({
        app,
        query: GET_USER_BY_MAIL,
        jwtToken,
        variables,
      });

      expect(findOneUserByEmail.findReservation[0].status).toBeDefined();
    });

    it('should be able to perform nested queries for rooms', async () => {
      const GET_USER_BY_MAIL = `
        query FindOneUserByEmail($email: String!) {
          findOneUserByEmail(email: $email) {
            findReservation {
              status
              
              findRoom {
                status
              }
            }
          }
        }`;

      const variables = {
        email: 'tomasm.leguizamon@gmail.com',
      };

      const { findOneUserByEmail } = await sendGraphQLRequest({
        app,
        query: GET_USER_BY_MAIL,
        jwtToken,
        variables,
      });

      expect(
        findOneUserByEmail.findReservation[0].findRoom.status,
      ).toBeDefined();
    });
  });

  describe('BLOCK/UNBLOCK', () => {
    it('should block a user', async () => {
      const BLOCK_USER = `
        mutation BlockUser($email: String!) {
          blockUser(email: $email) {
            isActive
          }
        }`;

      const variables = {
        email: 'tomasm.leguizamon@gmail.com',
      };

      const { blockUser } = await sendGraphQLRequest({
        app,
        query: BLOCK_USER,
        variables,
        jwtToken,
      });

      expect(blockUser.isActive).toBeTruthy();
    });

    it('should unblock a user', async () => {
      const BLOCK_USER = `
        mutation UnblockUser($email: String!) {
          unblockUser(email: $email) {
            isActive
          }
        }`;

      const variables = {
        email: 'tomasm.leguizamon@gmail.com',
      };

      const { unblockUser } = await sendGraphQLRequest({
        app,
        query: BLOCK_USER,
        variables,
        jwtToken,
      });

      expect(unblockUser.isActive).toBeFalsy();
    });
  });
});
