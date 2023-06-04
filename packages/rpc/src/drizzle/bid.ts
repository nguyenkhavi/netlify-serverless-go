import { sql } from 'drizzle-orm';
import { datetime, float, index, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const bid = mysqlTable(
  'bid',
  {
    id: varchar('id', { length: 32 }).primaryKey(),
    createdAt: datetime('created_at').default(sql`NOW()`),
    updatedAt: datetime('updated_at'),

    userId: varchar('user_id', { length: 32 }),
    price: float('price'),
    transactionHash: varchar('transaction_hash', { length: 64 }),

    // References to table market_listing
    marketId: varchar('market_id', { length: 32 }),
  },
  (table) => ({
    bidIdIdx: index('bid_id_idx').on(table.id),
  }),
);
