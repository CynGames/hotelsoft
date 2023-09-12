import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { AppModule } from '../app.module';
import * as fs from 'fs';

async function generateSchema() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const gqlSchemaHost = app.get(GraphQLSchemaHost);
  const schema = gqlSchemaHost.schema;

  fs.writeFileSync('./src/schema.gql', printSchema(schema));

  console.log('GraphQL schema has been successfully generated');
  process.exit(0);
}

generateSchema();
