-- CreateEnum
CREATE TYPE "InstructorVerificationStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'VERIFIED', 'REJECTED', 'NEEDS_INFO');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'INSTRUCTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('INDIVIDUAL', 'GROUP');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "firstName" TEXT,
    "lastName" TEXT,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "country" TEXT,
    "city" TEXT,
    "zipCode" TEXT,
    "beachLocation" TEXT,
    "certification" TEXT,
    "languages" TEXT[],
    "bio" TEXT,
    "portraitPictureUrl" TEXT,
    "portfolioImageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "levelToTeach" TEXT,
    "verificationStatus" "InstructorVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstructorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "price" DECIMAL(65,30) NOT NULL,
    "durationMinutes" INTEGER,
    "isRecurring" BOOLEAN,
    "dayOfWeek" INTEGER,
    "bookingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "availabilityId" TEXT NOT NULL,
    "bookedPrice" DECIMAL(65,30) NOT NULL,
    "bookedDurationMinutes" INTEGER,
    "bookingType" "BookingType" NOT NULL DEFAULT 'INDIVIDUAL',
    "numberOfStudents" INTEGER NOT NULL DEFAULT 1,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "location" TEXT NOT NULL,
    "equipmentIncluded" BOOLEAN NOT NULL DEFAULT false,
    "studentNotes" TEXT,
    "cancellationReason" TEXT,
    "cancellationTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InstructorProfile_userId_key" ON "InstructorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Availability_bookingId_key" ON "Availability"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_availabilityId_key" ON "Booking"("availabilityId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_bookingId_key" ON "Payment"("bookingId");

-- AddForeignKey
ALTER TABLE "InstructorProfile" ADD CONSTRAINT "InstructorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "InstructorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "InstructorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
