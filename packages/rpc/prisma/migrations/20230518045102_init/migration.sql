-- CreateEnum
CREATE TYPE "EGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "ESessionStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ESuggestionType" AS ENUM ('SUGGESTION', 'REPORT');

-- CreateEnum
CREATE TYPE "EActivityAction" AS ENUM ('CHANGE_PASSWORD', 'LOG_IN', 'SIGN_UP');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" "EGender" NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "email2FAEnabled" BOOLEAN NOT NULL DEFAULT false,
    "phone2FAEnabled" BOOLEAN NOT NULL DEFAULT false,
    "wallet" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-profiles" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personaInquiryId" TEXT,
    "instagramUid" TEXT,
    "twitterUid" TEXT,
    "cover" TEXT,
    "avatar" TEXT,
    "bio" TEXT,
    "additionalInfo" TEXT,

    CONSTRAINT "user-profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "notification-settings" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "itemSold" BOOLEAN NOT NULL DEFAULT true,
    "bidActivity" BOOLEAN NOT NULL DEFAULT true,
    "priceChange" BOOLEAN NOT NULL DEFAULT false,
    "auctionExpiration" BOOLEAN NOT NULL DEFAULT false,
    "outBid" BOOLEAN NOT NULL DEFAULT false,
    "ownedItemUpdates" BOOLEAN NOT NULL DEFAULT false,
    "successfulPurchase" BOOLEAN NOT NULL DEFAULT false,
    "fleamintNewsletter" BOOLEAN NOT NULL DEFAULT false,
    "mentions" BOOLEAN NOT NULL DEFAULT false,
    "replies" BOOLEAN NOT NULL DEFAULT false,
    "messages" BOOLEAN NOT NULL DEFAULT false,
    "suggestedItems" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notification-settings_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "streetAddress" TEXT,
    "secondStreetAddress" TEXT,
    "apartmentNumber" TEXT,
    "postCode" TEXT,
    "contactNumber" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "browser" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" "ESessionStatus" NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "browser" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "action" "EActivityAction" NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security-questions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "question" TEXT NOT NULL,

    CONSTRAINT "security-questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-answers" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "memorableAnswer" TEXT NOT NULL,

    CONSTRAINT "user-answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suggestions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ESuggestionType" NOT NULL,
    "detail" TEXT NOT NULL,

    CONSTRAINT "suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalVolume" INTEGER NOT NULL,
    "projects" INTEGER NOT NULL,
    "globalPartners" INTEGER NOT NULL,
    "totalUser" INTEGER NOT NULL,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscribers" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kyc-information" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personaInquiryId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "birthDate" TIMESTAMP(3),
    "addressStreet1" TEXT,
    "addressStreet2" TEXT,
    "addressCity" TEXT,
    "addressPostalCode" TEXT,
    "identificationNumber" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "kyc-information_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_key" ON "users"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "user-profiles_userId_key" ON "user-profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "notification-settings_userId_key" ON "notification-settings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user-answers_userId_questionId_key" ON "user-answers"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_email_key" ON "subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "kyc-information_userId_key" ON "kyc-information"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "kyc-information_personaInquiryId_key" ON "kyc-information"("personaInquiryId");

-- AddForeignKey
ALTER TABLE "user-profiles" ADD CONSTRAINT "user-profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification-settings" ADD CONSTRAINT "notification-settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-answers" ADD CONSTRAINT "user-answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-answers" ADD CONSTRAINT "user-answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "security-questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kyc-information" ADD CONSTRAINT "kyc-information_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
