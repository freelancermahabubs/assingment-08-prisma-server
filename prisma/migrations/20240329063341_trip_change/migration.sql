/*
  Warnings:

  - You are about to alter the column `budget` on the `trips` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "trips" ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT,
ALTER COLUMN "budget" SET DATA TYPE INTEGER;
