import { sql } from 'drizzle-orm';
import { datetime, index, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const item = mysqlTable(
  'item',
  {
    id: varchar('id', { length: 32 }).primaryKey(),
    createdAt: datetime('created_at').default(sql`NOW()`),
    updatedAt: datetime('updated_at'),

    name: varchar('name', { length: 32 }),
    metadata: varchar('metadata', { length: 32 }),
    image: varchar('image', { length: 128 }),
    tokenId: varchar('token_id', { length: 64 }),
    userId: varchar('user_id', { length: 32 }),
    contractAddress: varchar('contract_address', { length: 32 }),

    //Reference to table collection
    collectionId: varchar('collection_id', { length: 32 }),
  },
  (table) => ({
    itemId: index('item_id_idx').on(table.id),
    itemUserId: index('item_user_id_idx').on(table.userId),
  }),
);
