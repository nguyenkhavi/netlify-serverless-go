/*
  Warnings:

  - You are about to drop the column `chainId` on the `user-wallets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user-wallets" DROP CONSTRAINT "user-wallets_chainId_fkey";

-- DropIndex
DROP INDEX "user-wallets_userId_wallet_chainId_key";

-- AlterTable
ALTER TABLE "user-wallets" DROP COLUMN "chainId",
ADD CONSTRAINT "user-wallets_pkey" PRIMARY KEY ("wallet");
