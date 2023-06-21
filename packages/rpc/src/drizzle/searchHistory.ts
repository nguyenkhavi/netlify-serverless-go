import { timestamp, mysqlTable, serial, text, varchar } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const searchHistory = mysqlTable('search_history', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 52 }).notNull(),
  keyword: text('keyword').notNull(),
  createdAt: timestamp('created_at').default(sql`NOW()`),
});
