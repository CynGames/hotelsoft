import * as request from 'supertest';
import { ENDPOINT } from '../../config/constants';
import { INestApplication } from '@nestjs/common';

export async function loginTestQuery(app: INestApplication): Promise<string> {
  const LOGIN = `
      mutation Login($login: LoginInput!) {
        login(login: $login) {
          token
        }
      }`;

  const variables = {
    login: {
      email: 'tomasm.leguizamon@gmail.com',
      password: '123456',
    },
  };

  const response = await request(app.getHttpServer())
    .post(ENDPOINT)
    .set('Content-Type', 'application/json')
    .send({ query: LOGIN, variables });

  return response.body.data.login.token;
}
