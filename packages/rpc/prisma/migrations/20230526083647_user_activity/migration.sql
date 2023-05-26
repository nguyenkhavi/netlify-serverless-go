-- AlterTable
ALTER TABLE "user-activities" ALTER COLUMN "browser" DROP NOT NULL,
ALTER COLUMN "ipAddress" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;
