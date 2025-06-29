-- AlterTable
ALTER TABLE "InstructorProfile" ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "totalReviews" INTEGER NOT NULL DEFAULT 0;
