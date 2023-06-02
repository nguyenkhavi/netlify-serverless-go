import { sql } from 'drizzle-orm';
import { boolean, datetime, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const notificationSetting = mysqlTable('notification_setting', {
  userId: varchar('user_id', { length: 32 }).primaryKey(),
  createdAt: datetime('created_at').default(sql`NOW()`),
  updatedAt: datetime('updated_at'),
  // ------------
  itemSold: boolean('item_sold'),
  bidActivity: boolean('bid_activity'),
  priceChange: boolean('price-change'),
  auctionExpiration: boolean('auction_expiration'),
  itemSuggestion: boolean('item_suggestion'),
  outBid: boolean('out_bid'),
  ownedItemUpdate: boolean('owned_item_update'),
  successfulPurchase: boolean('successful_purchase'),
  fleamintNewsletter: boolean('fleamint_newsletter'),
  mentioned: boolean('mentioned'),
  replied: boolean('replied'),
  messaged: boolean('messaged'),
});
