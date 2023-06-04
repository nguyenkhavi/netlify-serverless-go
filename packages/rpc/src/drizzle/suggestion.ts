import { sql } from 'drizzle-orm';
import { datetime, mysqlTable, varchar, index } from 'drizzle-orm/mysql-core';
import { SuggestionTypeValues } from './enum';

export const suggestion = mysqlTable(
  'suggestion',
  {
    id: varchar('id', { length: 32 }).primaryKey(),
    createdAt: datetime('created_at').default(sql`NOW()`),
    updatedAt: datetime('updated_at'),

    userId: varchar('user_id', { length: 32 }),
    type: varchar('type', { length: 32, enum: SuggestionTypeValues }),
    detail: varchar('detail', { length: 256 }),
  },
  (table) => ({
    suggestionUserIdIndex: index('suggestion_user_id_idx').on(table.userId),
  }),
);
