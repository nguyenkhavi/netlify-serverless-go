/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "contactNumber",
ADD COLUMN     "additionalInformation" TEXT,
ADD COLUMN     "phoneCode" TEXT,
ADD COLUMN     "phoneNumber" TEXT;
