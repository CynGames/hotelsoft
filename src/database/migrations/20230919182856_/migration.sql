/*
  Warnings:

  - You are about to drop the column `checkIn` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `checkOut` on the `Reservation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_roomID_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userID_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "checkIn",
DROP COLUMN "checkOut",
ADD COLUMN     "checkInAt" TIMESTAMP(3),
ADD COLUMN     "checkOutAt" TIMESTAMP(3),
ALTER COLUMN "userID" DROP NOT NULL,
ALTER COLUMN "roomID" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room"("roomID") ON DELETE SET NULL ON UPDATE CASCADE;
