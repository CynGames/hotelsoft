import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { SeedService } from '../seed/seed.service';
import { Reservation } from '@prisma/client';

import {
  loginTestQuery,
  sendGraphQLRequest,
  setupTestingModule,
  teardownTestEnvironment,
} from '../common/test-utils';

describe('Rooms Resolver', () => {
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

  async function getReservations(getTotal?: boolean) {
    const GET_RESERVATIONS = `
        query FindAllReservations {
          findAllReservations {
            total
            data {
              reservationID 
              roomID
              userID
              checkInAt
              checkOutAt
              status
            }
          }
        }
      `;

    const { findAllReservations } = await sendGraphQLRequest({
      app,
      query: GET_RESERVATIONS,
      jwtToken,
    });

    return getTotal ? findAllReservations.total : findAllReservations.data;
  }

  async function getUsers(getTotal?: boolean) {
    const GET_USERS = `
        query FindAllUsers($email: String) {
          findAllUsers(email: $email) {
            data {
              userID
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

    return getTotal ? findAllUsers.total : findAllUsers.data;
  }

  async function getRooms(getTotal?: boolean) {
    const GET_ROOMS = `
        query FindAllRooms {
          findAllRooms {
            total
            data {
              roomID
            }
          }
        }
      `;

    const { findAllRooms } = await sendGraphQLRequest({
      app,
      query: GET_ROOMS,
      jwtToken,
    });

    return getTotal ? findAllRooms.total : findAllRooms.data;
  }

  describe('GET ALL RESERVATIONS', () => {
    it('should match the taken elements from pagination', async () => {
      const GET_RESERVATIONS = `
        query FindAllReservations ($skip: Int, $take: Int) {
          findAllReservations(skip: $skip, take: $take) {
            total
            data {
              reservationID
              roomID
              userID
              checkInAt
              checkOutAt
              status
            }
          }
        }
      `;

      const variables = {
        skip: 0,
        take: 30,
      };

      const { findAllReservations } = await sendGraphQLRequest({
        app,
        query: GET_RESERVATIONS,
        jwtToken,
        variables,
      });

      expect(findAllReservations.data).toHaveLength(variables.take);
    });

    it('should respond with array of status, checkInAt and userID', async () => {
      const GET_RESERVATIONS = `
        query FindAllReservations ($skip: Int, $take: Int) {
          findAllReservations(skip: $skip, take: $take) {
            total
            data {
              reservationID
              roomID
              userID
              checkInAt
              checkOutAt
              status
            }
          }
        }
      `;

      const variables = {
        skip: 0,
        take: 10,
      };

      const { findAllReservations } = await sendGraphQLRequest({
        app,
        query: GET_RESERVATIONS,
        jwtToken,
      });

      const randomValue = Math.floor(Math.random() * variables.take);

      expect(findAllReservations.data[randomValue].userID).toBeTruthy();
      expect(findAllReservations.data[randomValue].checkInAt).toBeTruthy();
      expect(findAllReservations.data[randomValue].status).toBeTruthy();
    });

    it('should filter by status', async () => {
      const GET_RESERVATIONS = `
        query FindAllReservations ($skip: Int, $take: Int, $status: ReservationStatus) {
          findAllReservations(skip: $skip, take: $take, status: $status) {
            total
            data {
              reservationID
              roomID
              userID
              checkInAt
              checkOutAt
              status
            }
          }
        }
      `;

      const variables = {
        skip: 0,
        take: 10,
        status: 'Cancelled',
      };

      const { findAllReservations } = await sendGraphQLRequest({
        app,
        query: GET_RESERVATIONS,
        jwtToken,
        variables,
      });

      findAllReservations.data.forEach((reservations: Reservation) => {
        expect(reservations.status).toBe('Cancelled');
      });
    });

    it('should be able to perform nested queries for users and reservations', async () => {
      const GET_RESERVATIONS = `
        query FindAllReservations {
          findAllReservations {
            total
            data {
              reservationID
              roomID
              userID
              checkInAt
              checkOutAt
              status
              findUser {
                firstName
              }
              findRoom {
                status
              }
            }
          }
        }
      `;

      const { findAllReservations } = await sendGraphQLRequest({
        app,
        query: GET_RESERVATIONS,
        jwtToken,
      });

      const userFound = findAllReservations.data.some((room: any) => {
        return room.findUser.firstName;
      });

      const roomFound = findAllReservations.data.some((room: any) => {
        return room.findRoom.status;
      });

      expect(userFound).toBeTruthy();
      expect(roomFound).toBeTruthy();
    });

    it('should be unauthorized', async () => {
      const GET_RESERVATIONS = `
        query FindAllReservations {
          findAllReservations {
            total
            data {
              reservationID
              roomID
              userID
              checkInAt
              checkOutAt
              status
            }
          }
        }
      `;

      const { errors } = await sendGraphQLRequest({
        app,
        query: GET_RESERVATIONS,
        isError: true,
      });

      expect(errors[0].message).toContain('Unauthorized');
    });
  });

  describe('GET RESERVATION BY ID ', () => {
    it('should get a reservation', async () => {
      const reservations = await getReservations();

      const GET_RESERVATION = `
        query FindOneReservation ($reservationID: ID!) {
          findOneReservation (reservationID: $reservationID) {
            reservationID
            roomID
            userID
            checkInAt
            checkOutAt
            status
          }
        }
      `;

      const variables = {
        reservationID: reservations[0].reservationID,
      };

      const { findOneReservation } = await sendGraphQLRequest({
        app,
        query: GET_RESERVATION,
        jwtToken,
        variables,
      });

      expect(findOneReservation).toStrictEqual(reservations[0]);
    });

    it('should fail to get a reservation - unauthorized', async () => {
      const reservations = await getReservations();

      const GET_RESERVATION = `
        query FindOneReservation ($reservationID: ID!) {
          findOneReservation (reservationID: $reservationID) {
            reservationID
            roomID
            userID
            checkInAt
            checkOutAt
            status
          }
        }
      `;

      const variables = {
        reservationID: reservations[0].reservationID,
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: GET_RESERVATION,
        variables,
        isError: true,
      });

      expect(errors[0].message).toContain('Unauthorized');
    });
  });

  describe('CREATE RESERVATION', () => {
    it('should create a reservation', async () => {
      const users = await getUsers();
      const rooms = await getRooms();

      const CREATE_RESERVATION = `
        mutation CreateReservation($createReservationInput: CreateReservationInput!) {
          createReservation(createReservationInput: $createReservationInput) {
            reservationID
          }
        }
      `;

      const variables = {
        createReservationInput: {
          userID: users[0].userID,
          roomID: rooms[0].roomID,
          checkInAt: '2022-12-02T03:00:00.000Z',
          checkOutAt: '2023-12-02T03:00:00.000Z',
          status: 'Confirmed',
        },
      };

      const { createReservation } = await sendGraphQLRequest({
        app,
        query: CREATE_RESERVATION,
        variables,
        jwtToken,
      });

      expect(createReservation.reservationID).toBeDefined();
    });

    it('should fail to create a room - bad input', async () => {
      const CREATE_RESERVATION = `
        mutation CreateReservation($createReservationInput: CreateReservationInput!) {
          createReservation(createReservationInput: $createReservationInput) {
            reservationID
          }
        }
      `;

      const { errors } = await sendGraphQLRequest({
        app,
        query: CREATE_RESERVATION,
        jwtToken,
        isError: true,
      });

      expect(errors[0].extensions.code).toContain('BAD_USER_INPUT');
    });

    it('should fail to create a room - unauthorized', async () => {
      const users = await getUsers();
      const rooms = await getRooms();

      const CREATE_RESERVATION = `
        mutation CreateReservation($createReservationInput: CreateReservationInput!) {
          createReservation(createReservationInput: $createReservationInput) {
            reservationID
          }
        }
      `;

      const variables = {
        createReservationInput: {
          userID: users[0].userID,
          roomID: rooms[0].roomID,
          checkInAt: '2022-12-02T03:00:00.000Z',
          checkOutAt: '2023-12-02T03:00:00.000Z',
          status: 'Confirmed',
        },
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: CREATE_RESERVATION,
        variables,
        isError: true,
      });

      expect(errors[0].message).toContain('Unauthorized');
    });
  });

  describe('UPDATE ROOM', () => {
    it('should update a room', async () => {
      const reservations = await getReservations();
      const users = await getUsers();
      const rooms = await getRooms();

      const UPDATE_RESERVATION = `
        mutation UpdateReservation($reservationID: String!, $updateReservationInput: UpdateReservationInput!) {
          updateReservation(reservationID: $reservationID, updateReservationInput: $updateReservationInput) {
            userID
            roomID
            checkInAt
            checkOutAt
            status
          }
        }
      `;

      const variables = {
        reservationID: reservations[0].reservationID,
        updateReservationInput: {
          userID: users[0].userID,
          roomID: rooms[0].roomID,
          checkInAt: '2022-12-02T03:00:00.000Z',
          checkOutAt: '2023-12-02T03:00:00.000Z',
          status: 'Confirmed',
        },
      };

      const { updateReservation } = await sendGraphQLRequest({
        app,
        query: UPDATE_RESERVATION,
        variables,
        jwtToken,
      });

      expect(updateReservation).toStrictEqual(variables.updateReservationInput);
    });

    it('should fail to update a room - bad request', async () => {
      const UPDATE_RESERVATION = `
        mutation UpdateReservation($reservationID: String!, $updateReservationInput: UpdateReservationInput!) {
          updateReservation(reservationID: $reservationID, updateReservationInput: $updateReservationInput) {
            userID
            roomID
            checkInAt
            checkOutAt
            status
          }
        }
      `;

      const variables = {
        updateReservationInput: {
          checkInAt: '2022-12-02T03:00:00.000Z',
          checkOutAt: '2023-12-02T03:00:00.000Z',
          status: 'Confirmed',
        },
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: UPDATE_RESERVATION,
        variables,
        jwtToken,
        isError: true,
      });

      expect(errors[0].extensions.code).toContain('BAD_USER_INPUT');
    });

    it('should fail to update a room - unauthorized', async () => {
      const reservations = await getReservations();
      const users = await getUsers();
      const rooms = await getRooms();

      const UPDATE_RESERVATION = `
        mutation UpdateReservation($reservationID: String!, $updateReservationInput: UpdateReservationInput!) {
          updateReservation(reservationID: $reservationID, updateReservationInput: $updateReservationInput) {
            userID
            roomID
            checkInAt
            checkOutAt
            status
          }
        }
      `;

      const variables = {
        reservationID: reservations[0].reservationID,
        updateReservationInput: {
          userID: users[0].userID,
          roomID: rooms[0].roomID,
          checkInAt: '2022-12-02T03:00:00.000Z',
          checkOutAt: '2023-12-02T03:00:00.000Z',
          status: 'Confirmed',
        },
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: UPDATE_RESERVATION,
        variables,
        isError: true,
      });

      expect(errors[0].message).toContain('Unauthorized');
    });
  });

  describe('REMOVE ROOM', () => {
    it('should remove a room', async () => {
      const reservations = await getReservations();
      const reservationsTotal = await getReservations(true);

      const REMOVE_RESERVATION = `
        mutation RemoveReservation($reservationID: String!) {
          removeReservation(reservationID: $reservationID) {
            reservationID
          }
        }
      `;

      const variables = {
        reservationID: reservations[0].reservationID,
      };

      const { removeReservation } = await sendGraphQLRequest({
        app,
        query: REMOVE_RESERVATION,
        variables,
        jwtToken,
      });

      const updatedReservationsTotal = await getReservations(true);

      expect(removeReservation).toBeTruthy();
      expect(updatedReservationsTotal).toBeLessThan(reservationsTotal);
    });

    it('should fail to delete a room - unauthorized', async () => {
      const reservations = await getReservations();

      const REMOVE_RESERVATION = `
        mutation RemoveReservation($reservationID: String!) {
          removeReservation(reservationID: $reservationID) {
            reservationID
          }
        }
      `;

      const variables = {
        reservationID: reservations[0].reservationID,
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: REMOVE_RESERVATION,
        variables,
        isError: true,
      });

      expect(errors[0].message).toContain('Unauthorized');
    });
  });
});
