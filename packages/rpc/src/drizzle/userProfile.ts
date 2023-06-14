import { GenderValues } from '_@rpc/drizzle/enum';
import { sql } from 'drizzle-orm';
import { datetime, mysqlTable, serial, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const userProfileTable = mysqlTable(
  'user_profile',
  {
    requestId: serial('request_id').primaryKey(),
    createdAt: datetime('created_at').default(sql`NOW()`),
    userId: varchar('user_id', { length: 52 }),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    username: varchar('username', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    dob: datetime('dob').notNull(),
    gender: varchar('gender', { length: 8, enum: GenderValues }).notNull(),
    phoneCode: varchar('phone_code', { length: 8 }).notNull(),
    phoneNumber: varchar('phone_number', { length: 16 }).notNull(),
  },
  (userProfile) => ({
    // usernameIndex: uniqueIndex('username_idx').on(userProfile.username),
    // emailIndex: uniqueIndex('username_idx').on(userProfile.email),
    // phoneIndex: uniqueIndex('phone_idx').on(userProfile.phoneCode, userProfile.phoneNumber),
  }),
);
