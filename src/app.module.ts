import { join } from 'path';
import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { ReservationsModule } from './reservations/reservations.module';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

function getEnvFilePath(): string[] {
  const nodeEnv = process.env.NODE_ENV || 'test';
  switch (nodeEnv) {
    case 'test':
      return ['.env', '.env'];
    case 'production':
      return ['.env'];
    default:
      return ['.env'];
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ReservationsModule,
    UsersModule,
    AuthModule,
    SeedModule,
    RoomsModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {
  constructor() {
    if (process.env.DEBUG == 'true') {
      console.log('NODE_ENV', process.env.NODE_ENV);
      console.log('host', process.env.APP_HOST);
      console.log('port', process.env.PORT);
      console.log('user', process.env.POSTGRES_USER);
      console.log('POSTGRES_PASSWORD', process.env.POSTGRES_PASSWORD);
      console.log('POSTGRES_DB', process.env.POSTGRES_DB);
      console.log('DATABASE_URL', process.env.DATABASE_URL);
    }
  }
}
