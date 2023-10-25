## Description

Hotelsoft is an educational practice application that simulates the core functionalities of a hotel's operations. Built using Nest.js and GraphQL, the application serves as a hands-on lab for budding developers who wish to understand how a full-fledged hotel management system can be built.

## Link to the application

https://hotelsoft-app-6dudj.ondigitalocean.app/graphql

_Note: By the end of October 2023, the app might stop running due to the Digital Ocean costs associated with running the app. If you wish to run the app locally, please follow the instructions below._

## Features

**Guest Management**:
   This feature allows the application to maintain a comprehensive database of guest profiles. The backend will have CRUD operations (Create, Read, Update, Delete) targeting the following schema:

- `guestID`: Primary Key. Uniquely identifies each guest.
- `firstName`: String. Holds the first name of the guest.
- `lastName`: String. Holds the last name of the guest.
- `email`: String. Holds the email address of the guest.
- `phoneNumber`: String. Holds the contact number of the guest.

The Operations allowed are:

- Create new guest profiles.
- View existing guest profiles.
- Update guest information.
- Delete guest profiles.


**Reservation Management**:
   This feature enables the user to manage room bookings and reservations. It utilizes the following schema to store reservation details:

- `reservationID`: Primary Key. Uniquely identifies each reservation.
- `guestID`: Foreign Key. References the Guests table to identify who made the reservation.
- `roomID`: Foreign Key. References the Rooms table to identify which room is reserved.
- `checkInDate`: Date. Specifies the check-in date.
- `checkOutDate`: Date. Specifies the check-out date.
- `status`: String. Stores the current status of the reservation.

The Operations allowed are:

- Make new reservations.
- View existing reservations.
- Update reservation details.
- Cancel reservations.

Room Management:
   This feature allows the administrative user to manage different types of rooms, their pricing, and availability status. It uses the following schema:

Rooms Table:

- `roomID`: Primary Key. Uniquely identifies each room.
- `type`: String. Describes the type of the room.
- `price`: Decimal. Lists the price for staying in the room.
- `status`: String. Gives the current status of the room.

The Operations allowed are:

- Add new rooms.
- View details of existing rooms.
- Update room information.
- Change room status.

## Technology Stack
- **Backend**: Nest.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API Layer**: GraphQL
- **Containerization**: Docker 

## Pre-requisites
Before running the application, make sure the following are installed:

- Node.js
- Docker
- Docker Compose

## Basics of running the app

### Local Test Environment

1 - **Clone Repository**: Clone the repository and navigate to its root directory.

```bash 
git clone [repository_url]
cd [repository_name]
```

2 - **Install Dependencies**: Run the following command to install required dependencies.

```bash 
npm install
```

3 - **Database Setup**: Use Docker to run the test database.

```bash 
npm run docker:test
```

4 - **Start App in Development Mode**: Run the application in watch mode.

```bash 
npm run start:dev
```

5 - **Verify GraphQL Playground**: Open your web browser and go to http://localhost:3000/graphql.

### Local Production Environment

1 - **Build Production Image**: Build a Docker image for the production environment.

```bash 
npm run docker:build
```

2 - **Run Production Container**: If you haven't modified anything in the Docker image, run the container.

```bash 
npm run docker:run
```

### Checking Functionality

1 - **Seed Database**: To populate the database with test data, execute the following GraphQL mutation.

```bash 
mutation {
  executeSeed
}
```

_Note: In the Apollo Playground go to Explorer -> mutation -> executeSeed._

2 - **Authenticate**: Obtain a JWT token by executing the login GraphQL mutation with the appropriate credentials.

```bash 
mutation Login($login: LoginInput!) {
  login(input: $login) {
    token
  }
}
```

Use variables like:

```bash 
{
  "login": {
    "email": "tomasm.leguizamon@gmail.com",
    "password": "123456"
  }
}
```

The expected response is:

```bash
{
  "data": {
    "login": {
    "token": "ey..."
    }
  }
}
```

_Note: In the Apollo Playground go to Explorer -> mutation -> login._

3 - **Token usage**: Paste the token in the headers or shared headers section to run queries that require higher privileges.


### Testing: 

**Run Tests**: To ensure the application is working as expected, you can run the integrated tests.


```bash 
npm run test
```

### CI/CD Pipeline Process
The CI/CD process is configured to run a series of tests each time a pull request is created. 

The pipeline verifies the integrity of the code, runs unit tests, and ensures that the build process is error-free. Once all the checks pass, the pull request can be reviewed and merged.
