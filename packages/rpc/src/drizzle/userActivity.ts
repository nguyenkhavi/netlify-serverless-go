import { sql } from 'drizzle-orm';
import { datetime, mysqlTable, varchar, index } from 'drizzle-orm/mysql-core';
import { activityActionValues } from './enum';

export const userActivity = mysqlTable(
  'user_activity',
  {
    id: varchar('id', { length: 32 }).primaryKey(),
    userId: varchar('user_id', { length: 32 }),
    createdAt: datetime('created_at').default(sql`NOW()`),
    updatedAt: datetime('updated_at'),

    browser: varchar('browser', { length: 32 }),
    ipAddress: varchar('ip_address', { length: 32 }),
    location: varchar('location', { length: 128 }),
    action: varchar('action', { length: 20, enum: activityActionValues }),
  },
  (table) => ({
    userIdIdx: index('activity_user_id_idx').on(table.userId),
    actionIdx: index('activity_action_idx').on(table.action),
  }),
);
