/*
  Warnings:

  - Made the column `userID` on table `Reservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roomID` on table `Reservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Reservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checkInAt` on table `Reservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checkOutAt` on table `Reservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isActive` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_roomID_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userID_fkey";

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "userID" SET NOT NULL,
ALTER COLUMN "roomID" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "checkInAt" SET NOT NULL,
ALTER COLUMN "checkOutAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL,
ALTER COLUMN "isActive" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room"("roomID") ON DELETE RESTRICT ON UPDATE CASCADE;
