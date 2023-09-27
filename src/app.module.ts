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

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    if (process.env.STATE !== 'test') {
      console.log('STATE', process.env.STATE);
      console.log('host', process.env.APP_HOST);
      console.log('port', process.env.PORT);
      console.log('user', process.env.POSTGRES_USER);
      console.log('POSTGRES_PASSWORD', process.env.POSTGRES_PASSWORD);
      console.log('POSTGRES_DB', process.env.POSTGRES_DB);
      console.log('DATABASE_URL', process.env.DATABASE_URL);
    }
  }
}
