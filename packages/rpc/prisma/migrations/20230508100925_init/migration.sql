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
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" STRING NOT NULL,
    "username" STRING NOT NULL,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" "EGender" NOT NULL,
    "password" STRING NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "email2FAEnabled" BOOL NOT NULL DEFAULT false,
    "phone2FAEnabled" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-profiles" (
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personaInquiryId" STRING,
    "instagramUid" STRING,
    "twitterUid" STRING,
    "country" STRING,
    "state" STRING,
    "bio" STRING,
    "streetAddress" STRING,
    "secondStreetAddress" STRING,
    "cover" STRING,
    "avatar" STRING,
    "apartmentNumber" STRING,
    "postCode" STRING,
    "contactNumber" STRING,
    "additionalInfo" STRING,

    CONSTRAINT "user-profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "notification-settings" (
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "itemSold" BOOL NOT NULL DEFAULT true,
    "bidActivity" BOOL NOT NULL DEFAULT true,
    "priceChange" BOOL NOT NULL DEFAULT false,
    "auctionExpiration" BOOL NOT NULL DEFAULT false,
    "outBid" BOOL NOT NULL DEFAULT false,
    "ownedItemUpdates" BOOL NOT NULL DEFAULT false,
    "successfulPurchase" BOOL NOT NULL DEFAULT false,
    "fleamintNewsletter" BOOL NOT NULL DEFAULT false,
    "mentions" BOOL NOT NULL DEFAULT false,
    "replies" BOOL NOT NULL DEFAULT false,
    "messages" BOOL NOT NULL DEFAULT false,
    "suggestedItems" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "notification-settings_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "sessions" (
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "browser" STRING NOT NULL,
    "ipAddress" STRING NOT NULL,
    "location" STRING NOT NULL,
    "status" "ESessionStatus" NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "activities" (
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "browser" STRING NOT NULL,
    "ipAddress" STRING NOT NULL,
    "location" STRING NOT NULL,
    "action" "EActivityAction" NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "security-questions" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "question" STRING NOT NULL,

    CONSTRAINT "security-questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-answers" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "questionId" STRING NOT NULL,
    "memorableAnswer" STRING NOT NULL,

    CONSTRAINT "user-answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suggestions" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "type" "ESuggestionType" NOT NULL,
    "detail" STRING NOT NULL,

    CONSTRAINT "suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalVolume" INT4 NOT NULL,
    "projects" INT4 NOT NULL,
    "globalPartners" INT4 NOT NULL,
    "totalUser" INT4 NOT NULL,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscribers" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" STRING NOT NULL,

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user-profiles_userId_key" ON "user-profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "notification-settings_userId_key" ON "notification-settings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userId_key" ON "sessions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "activities_userId_key" ON "activities"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user-answers_userId_questionId_key" ON "user-answers"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_email_key" ON "subscribers"("email");

-- AddForeignKey
ALTER TABLE "user-profiles" ADD CONSTRAINT "user-profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification-settings" ADD CONSTRAINT "notification-settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
