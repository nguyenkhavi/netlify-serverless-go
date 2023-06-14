import { sql } from 'drizzle-orm';
import { datetime, mysqlTable, varchar, index, serial } from 'drizzle-orm/mysql-core';
import { ActivityActionValues } from './enum';

export const userActivityTable = mysqlTable(
  'user_activity',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 52 }).notNull(),
    createdAt: datetime('created_at').default(sql`NOW()`),

    browser: varchar('browser', { length: 32 }),
    ipAddress: varchar('ip_address', { length: 32 }),
    location: varchar('location', { length: 128 }),
    action: varchar('action', { length: 20, enum: ActivityActionValues }),
  },
  (table) => ({
    userIdIdx: index('activity_user_id_idx').on(table.userId),
    actionIdx: index('activity_action_idx').on(table.action),
  }),
);
