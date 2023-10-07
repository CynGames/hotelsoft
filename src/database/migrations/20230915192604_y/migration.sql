-- CreateEnum
CREATE TYPE "ValidRoles" AS ENUM ('Guest', 'Supervisor', 'Admin');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('Single', 'Double', 'Suite');

-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('Available', 'Booked', 'Occupied');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('Confirmed', 'Cancelled', 'Pending');

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "isActive" BOOLEAN,
    "roles" "ValidRoles"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomID" TEXT NOT NULL,
    "type" "RoomType" NOT NULL,
    "price" TEXT NOT NULL,
    "status" "RoomStatus" NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomID")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reservationID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "roomID" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "status" "ReservationStatus" NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservationID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room"("roomID") ON DELETE RESTRICT ON UPDATE CASCADE;
