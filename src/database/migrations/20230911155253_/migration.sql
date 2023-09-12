-- noinspection SqlResolveForFile

/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('Admin', 'Supervisor', 'Guest');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "roles" "UserRoles",
ALTER COLUMN "isActive" DROP NOT NULL;

-- DropEnum
DROP TYPE "Role";
