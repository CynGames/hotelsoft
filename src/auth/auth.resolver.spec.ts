import { INestApplication } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { SeedService } from '../seed/seed.service';

import * as jwt from 'jsonwebtoken';

import {
  loginTestQuery,
  sendGraphQLRequest,
  setupTestingModule,
  teardownTestEnvironment,
} from '../common/test-utils';

describe('Auth Resolver', () => {
  let app: INestApplication;

  let prismaService: PrismaService;
  let seedService: SeedService;
  let jwtToken: string;

  let guestToken: string;
  let blockedToken: string;

  beforeAll(async () => {
    ({ app, prismaService, seedService } = await setupTestingModule());

    jwtToken = await loginTestQuery(app);
  });

  afterAll(async () => {
    await teardownTestEnvironment(app, prismaService, seedService);
  });

  describe('Login', () => {
    it('should get login token', async () => {
      const LOGIN = `
      mutation Login($login: LoginInput!) {
        login(login: $login) {
          token
          user {
            firstName
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
        login: {
          email: 'tomasm.leguizamon@gmail.com',
          password: '123456',
        },
      };

      const { login } = await sendGraphQLRequest({
        app,
        query: LOGIN,
        variables,
      });

      const token = login.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      expect(decoded).toHaveProperty('iat');
      expect(decoded).toHaveProperty('exp');
    });

    it('should fail to find a user', async () => {
      const LOGIN = `
      mutation Login($login: LoginInput!) {
        login(login: $login) {
          token
          user {
            firstName
          }
        }
      }`;

      const variables = {
        login: {
          email: 'fail.tomasm.leguizamon@gmail.com',
          password: '123456789',
        },
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: LOGIN,
        variables,
        isError: true,
      });

      expect(errors[0].message).toEqual('No User found');
    });

    it('should return a bad request exception', async () => {
      const LOGIN = `
      mutation Login($login: LoginInput!) {
        login(login: $login) {
          token
          user {
            firstName
          }
        }
      }`;

      const variables = {
        login: {
          email: '',
          password: '123456789',
        },
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: LOGIN,
        variables,
        isError: true,
      });

      expect(errors[0].message).toEqual('Bad Request Exception');
      expect(errors[0].extensions.originalError.statusCode).toEqual(400);
    });
  });

  describe('SignUp', () => {
    it('should signup a new non-Admin User', async () => {
      const SIGNUP = `
        mutation Signup($signupInput: SignupInput!) {
          signup(signupInput: $signupInput) {
            token
            user {
              firstName
              email
            }
          }
        }`;

      const variables = {
        signupInput: {
          email: 'no.admin.tomasm.leguizamon@sismogames.com',
          firstName: 'no.admin.Tomas',
          lastName: 'no.admin.Solvd',
          isActive: true,
          password: '654321',
          phoneNumber: '+48 (601) 733-2222',
          roles: ['Guest', 'Supervisor'],
        },
      };

      const { signup } = await sendGraphQLRequest({
        app,
        query: SIGNUP,
        variables,
      });

      const token = signup.token;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      expect(decoded).toHaveProperty('iat');
      expect(decoded).toHaveProperty('exp');

      guestToken = token;
    });

    it('should signup/create a new blocked User', async () => {
      const SIGNUP = `
        mutation Signup($signupInput: SignupInput!) {
          signup(signupInput: $signupInput) {
            token
            user {
              firstName
              email
            }
          }
        }`;

      const variables = {
        signupInput: {
          email: 'blocked.tomasm.leguizamon@solvd.com',
          firstName: 'blocked.Tomas',
          lastName: 'blocked.Solvd',
          isActive: false,
          password: '654321',
          phoneNumber: '+48 (601) 733-2222',
          roles: ['Admin'],
        },
      };

      const { signup } = await sendGraphQLRequest({
        app,
        query: SIGNUP,
        variables,
      });

      const token = signup.token;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      expect(decoded).toHaveProperty('iat');
      expect(decoded).toHaveProperty('exp');

      blockedToken = token;
    });

    it('should return a bad user input', async () => {
      const SIGNUP = `
        mutation Signup($signupInput: SignupInput!) {
          signup(signupInput: $signupInput) {
            token
            user {
              firstName
              email
            }
          }
        }`;

      const variables = {
        signupInput: {
          email: 'bad.tomasm.leguizamon@solvd.com',
          firstName: 'bad.Tomas',
          lastName: 'bad.Solvd',
          isActive: false,
          password: '654321',
        },
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: SIGNUP,
        variables,
        isError: true,
      });

      expect(errors[0].extensions.code).toEqual('BAD_USER_INPUT');
    });
  });

  describe('Revalidate', () => {
    it('should revalidate the token', async () => {
      const REVALIDATE = `
        query Revalidate {
          revalidate {
            token
            user {
              firstName
              lastName
              email
              roles
            }
          }
        }
      `;

      const { revalidate } = await sendGraphQLRequest({
        app,
        query: REVALIDATE,
        jwtToken,
      });

      expect(revalidate.user).toBeDefined();
    });

    it('should throw an error due to lack of role', async () => {
      const REVALIDATE = `
        query Revalidate {
          revalidate {
            token
            user {
              firstName
              lastName
              email
              roles
            }
          }
        }
      `;

      const { errors } = await sendGraphQLRequest({
        app,
        query: REVALIDATE,
        jwtToken: guestToken,
        isError: true,
      });

      expect(errors[0].message).toContain(
        'User undefined needs the role of [Admin] to access this resource.',
      );
    });

    it('should throw an error due to blocked user', async () => {
      const REVALIDATE = `
        query Revalidate {
          revalidate {
            token
            user {
              firstName
              lastName
              email
              roles
            }
          }
        }
      `;

      const { errors } = await sendGraphQLRequest({
        app,
        query: REVALIDATE,
        jwtToken: blockedToken,
        isError: true,
      });

      expect(errors[0].message).toContain(
        'User blocked.Tomas blocked.Solvd is blocked.',
      );
    });
  });
});
