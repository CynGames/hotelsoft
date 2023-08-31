-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('Available', 'Booked', 'Occupied');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('Confirmed', 'Cancelled');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('Paid', 'Unpaid');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Cash', 'CreditCard', 'DebitCard', 'PayPal', 'Venmo', 'Zelle', 'ApplePay', 'GooglePay', 'Bitcoin', 'Ethereum', 'Other');

-- CreateEnum
CREATE TYPE "MaintenanceStatus" AS ENUM ('Scheduled', 'InProgress', 'Completed', 'Cancelled');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Guest');

-- CreateTable
CREATE TABLE "Guest" (
    "guestID" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("guestID")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomID" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "status" "RoomStatus" NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomID")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reservationID" SERIAL NOT NULL,
    "guestID" INTEGER NOT NULL,
    "roomID" INTEGER NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "status" "ReservationStatus" NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservationID")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "invoiceID" SERIAL NOT NULL,
    "reservationID" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("invoiceID")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentID" SERIAL NOT NULL,
    "invoiceID" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentID")
);

-- CreateTable
CREATE TABLE "Maintenance" (
    "maintenanceID" SERIAL NOT NULL,
    "roomID" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" "MaintenanceStatus" NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("maintenanceID")
);

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_email_key" ON "Guest"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
