import { sql } from 'drizzle-orm';
import { datetime, float, index, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { ActivityTypeValues } from './enum';

export const activity = mysqlTable(
  'activity',
  {
    id: varchar('id', { length: 32 }).primaryKey(),
    createdAt: datetime('created_at').default(sql`NOW()`),
    updatedAt: datetime('updated_at'),

    type: varchar('type', { length: 32, enum: ActivityTypeValues }),
    fromUserId: varchar('from_user_id', { length: 32 }),
    toUserId: varchar('to_user_id', { length: 32 }),
    price: float('price'),
    transactionHash: varchar('transaction_hash', { length: 64 }),
    quantity: int('quantity'),

    // References to table token
    tokenId: varchar('token_id', { length: 32 }),
    // References to table collection
    collectionId: varchar('collection_id', { length: 32 }),
    // References to table item
    itemId: varchar('item_id', { length: 32 }),
  },
  (table) => ({
    collectionIdIdx: index('collection_id_idx').on(table.id),
  }),
);
