-- noinspection SqlResolveForFile

/*
  Warnings:

  - The primary key for the `Guest` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_pkey",
ALTER COLUMN "guestID" DROP DEFAULT,
ALTER COLUMN "guestID" SET DATA TYPE TEXT,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ADD CONSTRAINT "Guest_pkey" PRIMARY KEY ("guestID");
DROP SEQUENCE "Guest_guestID_seq";
