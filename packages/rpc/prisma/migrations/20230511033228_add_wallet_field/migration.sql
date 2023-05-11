/*
  Warnings:

  - A unique constraint covering the columns `[wallet]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wallet` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "activities_userId_key";

-- DropIndex
DROP INDEX "sessions_userId_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "wallet" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_key" ON "users"("wallet");
