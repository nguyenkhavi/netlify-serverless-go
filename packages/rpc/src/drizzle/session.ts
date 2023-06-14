import { InferModel, sql } from 'drizzle-orm';
import { datetime, mysqlTable, varchar, int, serial } from 'drizzle-orm/mysql-core';

export const session = mysqlTable('session', {
  id: serial('id').primaryKey(),
  iss: varchar('iss', { length: 52 }).notNull(),
  createdAt: datetime('created_at').default(sql`NOW()`),
  token: varchar('token', { length: 1000 }).notNull(),
  userAgent: varchar('userAgent', { length: 255 }),
  ipAddress: varchar('ipAddress', { length: 48 }),
  origin: varchar('origin', { length: 255 }),
  location: varchar('location', { length: 128 }),
  ext: int('ext'),
});

export type Session = InferModel<typeof session, 'select'>;
export type NewSession = InferModel<typeof session, 'insert'>;
