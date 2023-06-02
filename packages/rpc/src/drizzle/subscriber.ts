import { sql } from 'drizzle-orm';
import { datetime, mysqlTable, varchar, index } from 'drizzle-orm/mysql-core';

export const subscriber = mysqlTable(
  'subscriber',
  {
    id: varchar('id', { length: 32 }).primaryKey(),
    createdAt: datetime('created_at').default(sql`NOW()`),
    updatedAt: datetime('updated_at'),
    email: varchar('email', { length: 255 }),
  },
  (subscriber) => ({
    emailIndex: index('email_idx').on(subscriber.email),
  }),
);
