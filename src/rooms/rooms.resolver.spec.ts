import { PrismaService } from '../database/prisma.service';
import { SeedService } from '../seed/seed.service';
import { INestApplication } from '@nestjs/common';
import {
  loginTestQuery,
  sendGraphQLRequest,
  setupTestingModule,
  teardownTestEnvironment,
} from '../common/test-utils';
import { Room } from '@prisma/client';

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

  async function getRooms(getTotal?: boolean) {
    const GET_ROOMS = `
        query FindAllRooms {
          findAllRooms {
            total
            data {
              roomID
              type
              price
              status
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

  describe('GET ALL ROOMS', () => {
    it('should match the taken elements from pagination', async () => {
      const GET_ROOMS = `
        query FindAllRooms($skip: Int, $take: Int) {
          findAllRooms(skip: $skip, take: $take) {
            total
            data {
              roomID
            }
          }
        }
      `;

      const variables = {
        skip: 0,
        take: 10,
      };

      const { findAllRooms } = await sendGraphQLRequest({
        app,
        query: GET_ROOMS,
        jwtToken,
        variables,
      });

      expect(findAllRooms.data).toHaveLength(variables.take);
    });

    it('should respond with array of type, price and status', async () => {
      const GET_ROOMS = `
        query FindAllRooms($skip: Int, $take: Int) {
          findAllRooms(skip: $skip, take: $take) {
            data {
              type
              price
              status
            }
          }
        }
      `;

      const variables = {
        skip: 0,
        take: 10,
      };

      const { findAllRooms } = await sendGraphQLRequest({
        app,
        query: GET_ROOMS,
        jwtToken,
        variables,
      });

      const randomValue = Math.floor(Math.random() * variables.take);

      expect(findAllRooms.data[randomValue].type).toBeTruthy();
      expect(findAllRooms.data[randomValue].price).toBeTruthy();
      expect(findAllRooms.data[randomValue].status).toBeTruthy();
    });

    it('should filter by status', async () => {
      const GET_ROOMS = `
        query FindAllRooms($skip: Int, $take: Int, $status: RoomStatus) {
          findAllRooms(skip: $skip, take: $take, status: $status) {
            data {
              status
            }
          }
        }`;

      const variables = {
        skip: 0,
        take: 10,
        status: 'Booked',
      };

      const { findAllRooms } = await sendGraphQLRequest({
        app,
        query: GET_ROOMS,
        jwtToken,
        variables,
      });

      findAllRooms.data.forEach((room: Room) => {
        expect(room.status).toBe('Booked');
      });
    });

    it('should be able to perform nested queries for reservations', async () => {
      const GET_ROOMS = `
        query FindAllRooms {
          findAllRooms {
            data {
              findReservation {
                status
              }
            }
          }
        }`;

      const { findAllRooms } = await sendGraphQLRequest({
        app,
        query: GET_ROOMS,
        jwtToken,
        debug: true,
      });

      const found = findAllRooms.data.some((room: any) => {
        return room.findReservation[0].status;
      });

      expect(found).toBeTruthy();
    });

    it('should be unauthorized', async () => {
      const GET_ROOMS = `
        query FindAllRooms {
          findAllRooms {
            data {
              findReservation {
                status
              }
            }
          }
        }`;

      const { errors } = await sendGraphQLRequest({
        app,
        query: GET_ROOMS,
        isError: true,
      });

      expect(errors[0].message).toContain('Unauthorized');
    });
  });

  describe('GET ROOM BY ID ', () => {
    it('should get a room', async () => {
      const rooms = await getRooms();

      const GET_ROOM = `
        query FindOneRoom($roomID: ID!) {
          findOneRoom(roomID: $roomID) {
            roomID
            type
            price
            status
          }
        }
      `;

      const variables = {
        roomID: rooms[0].roomID,
      };

      const { findOneRoom } = await sendGraphQLRequest({
        app,
        query: GET_ROOM,
        jwtToken,
        variables,
      });

      expect(findOneRoom).toStrictEqual(rooms[0]);
    });

    it('should fail to get a room - unauthorized', async () => {
      const rooms = await getRooms();

      const GET_ROOM = `
        query FindOneRoom($roomID: ID!) {
          findOneRoom(roomID: $roomID) {
            roomID
            type
            price
            status
          }
        }
      `;

      const variables = {
        roomID: rooms[0].roomID,
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: GET_ROOM,
        variables,
        isError: true,
      });

      expect(errors[0].message).toContain('Unauthorized');
    });
  });

  describe('CREATE ROOM', () => {
    it('should create a room', async () => {
      const CREATE_ROOM = `
        mutation CreateRoom($createRoomInput: CreateRoomInput!) {
          createRoom(createRoomInput: $createRoomInput) {
            roomID
          }
        }
      `;

      const variables = {
        createRoomInput: {
          type: 'Double',
          price: '100',
          status: 'Occupied',
        },
      };

      const { createRoom } = await sendGraphQLRequest({
        app,
        query: CREATE_ROOM,
        variables,
        jwtToken,
      });

      expect(createRoom.roomID).toBeDefined();
    });

    it('should fail to create a room - bad input', async () => {
      const CREATE_ROOM = `
        mutation CreateRoom($createRoomInput: CreateRoomInput!) {
          createRoom(createRoomInput: $createRoomInput) {
            roomID
          }
        }
      `;

      const { errors } = await sendGraphQLRequest({
        app,
        query: CREATE_ROOM,
        jwtToken,
        isError: true,
      });

      expect(errors[0].extensions.code).toContain('BAD_USER_INPUT');
    });

    it('should fail to create a room - unauthorized', async () => {
      const CREATE_ROOM = `
        mutation CreateRoom($createRoomInput: CreateRoomInput!) {
          createRoom(createRoomInput: $createRoomInput) {
            roomID
          }
        }
      `;

      const variables = {
        createRoomInput: {
          type: 'Double',
          price: '100',
          status: 'Occupied',
        },
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: CREATE_ROOM,
        variables,
        isError: true,
      });

      expect(errors[0].message).toContain('Unauthorized');
    });
  });

  describe('UPDATE ROOM', () => {
    it('should update a room', async () => {
      const rooms = await getRooms();

      const UPDATE_ROOM = `
        mutation UpdateRoom($updateRoomInput: UpdateRoomInput!) {
          updateRoom(updateRoomInput: $updateRoomInput) {
            roomID
            type
            price
            status
          }
        }
      `;

      const variables = {
        updateRoomInput: {
          roomID: rooms[0].roomID,
          type: 'Suite',
          price: '99999',
          status: 'Available',
        },
      };

      const { updateRoom } = await sendGraphQLRequest({
        app,
        query: UPDATE_ROOM,
        variables,
        jwtToken,
      });

      expect(updateRoom).toStrictEqual(variables.updateRoomInput);
    });

    it('should fail to update a room - bad request', async () => {
      const UPDATE_ROOM = `
        mutation UpdateRoom($updateRoomInput: UpdateRoomInput!) {
          updateRoom(updateRoomInput: $updateRoomInput) {
            roomID
            type
            price
            status
          }
        }
      `;

      const variables = {
        updateRoomInput: {
          type: 'Suite',
          price: '99999',
          status: 'Available',
        },
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: UPDATE_ROOM,
        variables,
        jwtToken,
        isError: true,
      });

      expect(errors[0].extensions.code).toContain('BAD_USER_INPUT');
    });

    it('should fail to update a room - unauthorized', async () => {
      const rooms = await getRooms();

      const UPDATE_ROOM = `
        mutation UpdateRoom($updateRoomInput: UpdateRoomInput!) {
          updateRoom(updateRoomInput: $updateRoomInput) {
            roomID
            type
            price
            status
          }
        }
      `;

      const variables = {
        updateRoomInput: {
          roomID: rooms[0].roomID,
          type: 'Double',
          price: '100',
          status: 'Occupied',
        },
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: UPDATE_ROOM,
        variables,
        isError: true,
      });

      expect(errors[0].message).toContain('Unauthorized');
    });
  });

  describe('REMOVE ROOM', () => {
    it('should remove a room', async () => {
      const rooms = await getRooms();
      const roomsTotal = await getRooms(true);

      const REMOVE_ROOM = `
        mutation RemoveRoom($roomID: String!) {
          removeRoom(roomID: $roomID) {
            roomID
          }
        }
      `;

      const variables = {
        roomID: rooms[0].roomID,
      };

      const { removeRoom } = await sendGraphQLRequest({
        app,
        query: REMOVE_ROOM,
        variables,
        jwtToken,
      });

      const updatedRoomsTotal = await getRooms(true);

      expect(removeRoom).toBeTruthy();
      expect(updatedRoomsTotal).toBeLessThan(roomsTotal);
    });

    it('should fail to delete a room - unauthorized', async () => {
      const rooms = await getRooms();

      const REMOVE_ROOM = `
        mutation RemoveRoom($roomID: String!) {
          removeRoom(roomID: $roomID) {
            roomID
          }
        }
      `;

      const variables = {
        roomID: rooms[0].roomID,
      };

      const { errors } = await sendGraphQLRequest({
        app,
        query: REMOVE_ROOM,
        variables,
        isError: true,
      });

      expect(errors[0].message).toContain('Unauthorized');
    });
  });
});
