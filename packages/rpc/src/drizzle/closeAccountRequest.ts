import { sql } from 'drizzle-orm';
import { mysqlTable, varchar, index, serial, timestamp, text } from 'drizzle-orm/mysql-core';

export const closeAccountRequestTable = mysqlTable(
  'close_account_request',
  {
    id: serial('id').primaryKey(),
    wallet: varchar('wallet', { length: 52 }).notNull(),
    createdAt: timestamp('created_at').default(sql`NOW()`),
    tellUs: varchar('tell_us', { length: 52 }).notNull(),
    tellUsMore: text('tell_us_more'),
  },
  (table) => ({
    walletIdIdx: index('close_account_wallet_id_idx').on(table.wallet),
  }),
);
