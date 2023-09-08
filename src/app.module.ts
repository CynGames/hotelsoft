import { join } from 'path';
import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { GuestsModule } from './guests/guests.module';
import { InvoicesModule } from './invoices/invoices.module';
import { MaintenancesModule } from './maintenances/maintenances.module';
import { PaymentsModule } from './payments/payments.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomModule } from './room/room.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

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
    GuestsModule,
    RoomModule,
    InvoicesModule,
    PaymentsModule,
    MaintenancesModule,
    UsersModule,
    AuthModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
