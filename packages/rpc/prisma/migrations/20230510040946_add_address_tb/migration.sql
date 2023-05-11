/*
  Warnings:

  - You are about to drop the column `apartmentNumber` on the `user-profiles` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `user-profiles` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `user-profiles` table. All the data in the column will be lost.
  - You are about to drop the column `postCode` on the `user-profiles` table. All the data in the column will be lost.
  - You are about to drop the column `secondStreetAddress` on the `user-profiles` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `user-profiles` table. All the data in the column will be lost.
  - You are about to drop the column `streetAddress` on the `user-profiles` table. All the data in the column will be lost.
  - The required column `id` was added to the `activities` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `sessions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "activities_userId_key";

-- DropIndex
DROP INDEX "sessions_userId_key";

-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "id" STRING NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "id" STRING NOT NULL;

-- AlterTable
ALTER TABLE "user-profiles" DROP COLUMN "apartmentNumber";
ALTER TABLE "user-profiles" DROP COLUMN "contactNumber";
ALTER TABLE "user-profiles" DROP COLUMN "country";
ALTER TABLE "user-profiles" DROP COLUMN "postCode";
ALTER TABLE "user-profiles" DROP COLUMN "secondStreetAddress";
ALTER TABLE "user-profiles" DROP COLUMN "state";
ALTER TABLE "user-profiles" DROP COLUMN "streetAddress";

-- AlterPrimaryKey
ALTER TABLE "activities" ALTER PRIMARY KEY USING COLUMNS ("id");

-- AlterPrimaryKey
ALTER TABLE "sessions" ALTER PRIMARY KEY USING COLUMNS ("id");

-- CreateTable
CREATE TABLE "addresses" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "country" STRING,
    "state" STRING,
    "streetAddress" STRING,
    "secondStreetAddress" STRING,
    "apartmentNumber" STRING,
    "postCode" STRING,
    "contactNumber" STRING,
    "isDefault" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
