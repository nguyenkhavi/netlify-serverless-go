import { GenderValues } from '_@rpc/drizzle/enum';
import { InferModel, sql } from 'drizzle-orm';
import { index, mysqlTable, serial, timestamp, tinytext, varchar } from 'drizzle-orm/mysql-core';

export const userProfileTable = mysqlTable(
  'user_profile',
  {
    requestId: serial('request_id').primaryKey(),
    createdAt: timestamp('created_at').default(sql`NOW()`),
    userId: varchar('user_id', { length: 52 }),
    wallet: varchar('wallet', { length: 52 }),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    username: varchar('username', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    dob: timestamp('dob').notNull(),
    gender: varchar('gender', { length: 8, enum: GenderValues }).notNull(),
    phoneCode: varchar('phone_code', { length: 8 }).notNull(),
    phoneNumber: varchar('phone_number', { length: 16 }).notNull(),

    avatarUrl: tinytext('avatar_url'),
    coverUrl: tinytext('cover_url'),
    aboutMe: tinytext('about_me'),
    description: tinytext('description'),
    twitterUid: tinytext('twitter_uid'),
    instagramUid: tinytext('instagram_uid'),
    personaInquiryId: tinytext('persona_inquiry_id'),
  },
  (userProfile) => ({
    usernameIndex: index('username_idx').on(userProfile.username),
    emailIndex: index('email_idx').on(userProfile.email),
    phoneIndex: index('phone_idx').on(userProfile.phoneCode, userProfile.phoneNumber),
    walletIndex: index('wallet_idx').on(userProfile.wallet),
  }),
);

export type Profile = InferModel<typeof userProfileTable, 'select'>;
export type TProfile = Profile & { userId: string; wallet: string };
export type NewProfile = InferModel<typeof userProfileTable, 'insert'>;
