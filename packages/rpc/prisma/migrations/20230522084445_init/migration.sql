/*
  Warnings:

  - You are about to drop the column `action` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `browser` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user-profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fromUserId` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ETokenStandard" AS ENUM ('ERC_721', 'ERC_1155');

-- CreateEnum
CREATE TYPE "EMarketType" AS ENUM ('AUCTION', 'DIRECT_LISTING');

-- CreateEnum
CREATE TYPE "EMarketStatus" AS ENUM ('AVAILABLE', 'CANCELLED', 'EXPIRED', 'SUCCESS');

-- CreateEnum
CREATE TYPE "EActivityType" AS ENUM ('TRANSFER', 'MINT', 'BURN', 'SELL', 'BUY', 'BID', 'ACCEPT_BID', 'UPDATE_LISTING', 'CANCEL_LISTING', 'CANCEL_BID');

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_userId_fkey";

-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "kyc-information" DROP CONSTRAINT "kyc-information_userId_fkey";

-- DropForeignKey
ALTER TABLE "notification-settings" DROP CONSTRAINT "notification-settings_userId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "suggestions" DROP CONSTRAINT "suggestions_userId_fkey";

-- DropForeignKey
ALTER TABLE "user-answers" DROP CONSTRAINT "user-answers_userId_fkey";

-- DropForeignKey
ALTER TABLE "user-profiles" DROP CONSTRAINT "user-profiles_userId_fkey";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "action",
DROP COLUMN "browser",
DROP COLUMN "ipAddress",
DROP COLUMN "location",
DROP COLUMN "userId",
ADD COLUMN     "collectionId" TEXT,
ADD COLUMN     "fromUserId" TEXT NOT NULL,
ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "toUserId" TEXT,
ADD COLUMN     "tokenId" TEXT,
ADD COLUMN     "transactionHash" TEXT,
ADD COLUMN     "type" "EActivityType" NOT NULL;

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "user-profiles";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "EGender";

-- DropEnum
DROP TYPE "ESessionStatus";

-- CreateTable
CREATE TABLE "user-wallets" (
    "userId" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "chainId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user-activities" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "browser" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "action" "EActivityAction" NOT NULL,

    CONSTRAINT "user-activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chain" (
    "chainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Chain_pkey" PRIMARY KEY ("chainId")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "tokenStandard" "ETokenStandard" NOT NULL DEFAULT 'ERC_721',
    "image" TEXT NOT NULL,
    "royaltyFeePercentage" DOUBLE PRECISION NOT NULL,
    "chainId" TEXT NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collectionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tokenContract" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
    "tokenName" TEXT NOT NULL,
    "tokenDecimal" INTEGER NOT NULL,
    "chainId" TEXT NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "market-listings" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "marketType" "EMarketType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "expiredAt" TIMESTAMP(3),
    "buyoutPrice" DOUBLE PRECISION,
    "reservePrice" DOUBLE PRECISION,
    "royaltyFeePercentage" DOUBLE PRECISION NOT NULL,
    "transactionHash" TEXT NOT NULL,

    CONSTRAINT "market-listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bids" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "marketId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "transactionHash" TEXT NOT NULL,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user-wallets_userId_wallet_chainId_key" ON "user-wallets"("userId", "wallet", "chainId");

-- AddForeignKey
ALTER TABLE "user-wallets" ADD CONSTRAINT "user-wallets_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "Chain"("chainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "Chain"("chainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "Chain"("chainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market-listings" ADD CONSTRAINT "market-listings_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market-listings" ADD CONSTRAINT "market-listings_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market-listings" ADD CONSTRAINT "market-listings_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "market-listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
