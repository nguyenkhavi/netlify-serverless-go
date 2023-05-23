/*
  Warnings:

  - You are about to drop the `Chain` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_chainId_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_chainId_fkey";

-- DropForeignKey
ALTER TABLE "user-wallets" DROP CONSTRAINT "user-wallets_chainId_fkey";

-- DropTable
DROP TABLE "Chain";

-- CreateTable
CREATE TABLE "chains" (
    "chainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "chains_pkey" PRIMARY KEY ("chainId")
);

-- AddForeignKey
ALTER TABLE "user-wallets" ADD CONSTRAINT "user-wallets_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "chains"("chainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "chains"("chainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "chains"("chainId") ON DELETE RESTRICT ON UPDATE CASCADE;
