import { sql } from 'drizzle-orm';
import { datetime, float, index, mysqlTable, varchar, int } from 'drizzle-orm/mysql-core';
import { MarketStatusValues } from './enum';

export const marketListing = mysqlTable(
  'market_listing',
  {
    id: varchar('id', { length: 32 }).primaryKey(),
    createdAt: datetime('created_at').default(sql`NOW()`),
    updatedAt: datetime('updated_at'),
    expiredAt: datetime('expired_at'),

    userId: varchar('user_id', { length: 32 }),
    marketType: varchar('market_type', { length: 32, enum: MarketStatusValues }),
    price: float('price'),
    buyoutPrice: float('buyout_price'),
    reservePrice: float('reverse_price'),
    royaltyFeePercentage: float('royalty_fee_percentage'),
    quantity: int('quantity'),
    transactionHash: varchar('transaction_hash', { length: 64 }),

    // References to table item
    itemId: varchar('item_id', { length: 32 }),
    // References to table collection
    collectionId: varchar('collection_id', { length: 32 }),
    // References to table token
    tokenId: varchar('token_id', { length: 32 }),
  },
  (table) => ({
    marketListingIdIdx: index('market_listing_id_idx').on(table.id),
  }),
);
