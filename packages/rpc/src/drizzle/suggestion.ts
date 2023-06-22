import { sql } from 'drizzle-orm';
import { serial, timestamp, mysqlTable, varchar, index, text } from 'drizzle-orm/mysql-core';
import { SuggestionTypeValues } from './enum';

export const suggestionTable = mysqlTable(
  'suggestion',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').default(sql`NOW()`),

    userId: varchar('user_id', { length: 52 }),
    type: varchar('type', { length: 32, enum: SuggestionTypeValues }),
    detail: text('detail'),
  },
  (table) => ({
    suggestionUserIdIndex: index('suggestion_user_id_idx').on(table.userId),
  }),
);
