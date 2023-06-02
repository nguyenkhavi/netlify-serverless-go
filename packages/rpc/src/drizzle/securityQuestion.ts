import { mysqlTable, varchar, datetime } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const securityQuestion = mysqlTable('security_question', {
  id: varchar('id', { length: 12 }).primaryKey(),
  createdAt: datetime('created_at').default(sql`NOW()`),
  updatedAt: datetime('updated_at'),

  question: varchar('question', { length: 64 }),
});
