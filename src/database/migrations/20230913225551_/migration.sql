/*
  Warnings:

  - The values [USER,SUPERVISOR,ADMIN] on the enum `ValidRoles` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `guestID` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Maintenance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('Single', 'Double', 'Suite');

-- AlterEnum
BEGIN;
CREATE TYPE "ValidRoles_new" AS ENUM ('Guest', 'Supervisor', 'Admin');
ALTER TABLE "User" ALTER COLUMN "roles" TYPE "ValidRoles_new"[] USING ("roles"::text::"ValidRoles_new"[]);
ALTER TYPE "ValidRoles" RENAME TO "ValidRoles_old";
ALTER TYPE "ValidRoles_new" RENAME TO "ValidRoles";
DROP TYPE "ValidRoles_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_guestID_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "guestID",
ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "type",
ADD COLUMN     "type" "RoomType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- DropTable
DROP TABLE "Guest";

-- DropTable
DROP TABLE "Invoice";

-- DropTable
DROP TABLE "Maintenance";

-- DropTable
DROP TABLE "Payment";

-- DropEnum
DROP TYPE "InvoiceStatus";

-- DropEnum
DROP TYPE "MaintenanceStatus";

-- DropEnum
DROP TYPE "PaymentMethod";

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room"("roomID") ON DELETE SET NULL ON UPDATE CASCADE;
