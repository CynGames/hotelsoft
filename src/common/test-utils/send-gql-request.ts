import { INestApplication } from '@nestjs/common';

import { ENDPOINT } from '../../config/constants';
import * as request from 'supertest';

interface SendGraphQLRequestOptions {
  app: INestApplication;
  query: string;
  jwtToken?: string;
  variables?: any;
  isError?: boolean;
  debug?: boolean;
}

export async function sendGraphQLRequest({
  app,
  query,
  jwtToken = '',
  variables = {},
  isError = false,
  debug = false,
}: SendGraphQLRequestOptions): Promise<any> {
  const server = app.getHttpServer();
  const response = await request(server)
    .post(ENDPOINT)
    .set('Authorization', `Bearer ${jwtToken}`)
    .send({ query, variables });

  if (debug) console.log(response.body);

  return isError ? response.body : response.body.data;
}
