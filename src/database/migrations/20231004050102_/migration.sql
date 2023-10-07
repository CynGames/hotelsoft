/*
  Warnings:

  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_roomID_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userID_fkey";

-- DropTable
DROP TABLE "Reservation";

-- DropTable
DROP TABLE "Room";

-- CreateTable
CREATE TABLE "rooms" (
    "roomID" TEXT NOT NULL,
    "type" "RoomType" NOT NULL,
    "price" TEXT NOT NULL,
    "status" "RoomStatus" NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("roomID")
);

-- CreateTable
CREATE TABLE "reservations" (
    "reservationID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "roomID" TEXT NOT NULL,
    "checkInAt" TIMESTAMP(3) NOT NULL,
    "checkOutAt" TIMESTAMP(3) NOT NULL,
    "status" "ReservationStatus" NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("reservationID")
);

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "rooms"("roomID") ON DELETE CASCADE ON UPDATE CASCADE;
