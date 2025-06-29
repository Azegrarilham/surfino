/*
  Warnings:

  - A unique constraint covering the columns `[reviewId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "reviewId" TEXT;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_bookingId_key" ON "Review"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_reviewId_key" ON "Booking"("reviewId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "InstructorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
