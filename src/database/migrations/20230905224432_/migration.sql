/*
  Warnings:

  - The primary key for the `Invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Maintenance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Reservation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
ALTER TYPE "ReservationStatus" ADD VALUE 'Pending';

-- AlterTable
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_pkey",
ALTER COLUMN "invoiceID" DROP DEFAULT,
ALTER COLUMN "invoiceID" SET DATA TYPE TEXT,
ALTER COLUMN "reservationID" DROP NOT NULL,
ALTER COLUMN "reservationID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("invoiceID");
DROP SEQUENCE "Invoice_invoiceID_seq";

-- AlterTable
ALTER TABLE "Maintenance" DROP CONSTRAINT "Maintenance_pkey",
ALTER COLUMN "maintenanceID" DROP DEFAULT,
ALTER COLUMN "maintenanceID" SET DATA TYPE TEXT,
ALTER COLUMN "roomID" DROP NOT NULL,
ALTER COLUMN "roomID" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ADD CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("maintenanceID");
DROP SEQUENCE "Maintenance_maintenanceID_seq";

-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
ALTER COLUMN "paymentID" DROP DEFAULT,
ALTER COLUMN "paymentID" SET DATA TYPE TEXT,
ALTER COLUMN "invoiceID" DROP NOT NULL,
ALTER COLUMN "invoiceID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentID");
DROP SEQUENCE "Payment_paymentID_seq";

-- AlterTable
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_pkey",
ALTER COLUMN "reservationID" DROP DEFAULT,
ALTER COLUMN "reservationID" SET DATA TYPE TEXT,
ALTER COLUMN "guestID" DROP NOT NULL,
ALTER COLUMN "guestID" SET DATA TYPE TEXT,
ALTER COLUMN "roomID" DROP NOT NULL,
ALTER COLUMN "roomID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservationID");
DROP SEQUENCE "Reservation_reservationID_seq";

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
ALTER COLUMN "roomID" DROP DEFAULT,
ALTER COLUMN "roomID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("roomID");
DROP SEQUENCE "Room_roomID_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "userID" DROP DEFAULT,
ALTER COLUMN "userID" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userID");
DROP SEQUENCE "User_userID_seq";

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_guestID_fkey" FOREIGN KEY ("guestID") REFERENCES "Guest"("guestID") ON DELETE SET NULL ON UPDATE CASCADE;
