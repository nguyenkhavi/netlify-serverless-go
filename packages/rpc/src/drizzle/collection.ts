import { sql } from 'drizzle-orm';
import { datetime, float, index, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { TokenStandardValues } from './enum';

export const collection = mysqlTable(
  'collection',
  {
    id: varchar('id', { length: 32 }).primaryKey(),
    createdAt: datetime('created_at').default(sql`NOW()`),
    updatedAt: datetime('updated_at'),

    creatorId: varchar('creator_id', { length: 32 }),
    metadata: varchar('metadata', { length: 32 }),
    name: varchar('name', { length: 32 }),
    contractAddress: varchar('contract_address', { length: 32 }),
    tokenStandard: varchar('token-standard', { length: 32, enum: TokenStandardValues }),
    image: varchar('image', { length: 128 }),
    royaltyFeePercentage: float('royalty_fee_percentage'),
    // References to table chain
    chainId: varchar('chain_id', { length: 32 }),
  },
  (table) => ({
    collectionIdIdx: index('collection_id_idx').on(table.id),
  }),
);
