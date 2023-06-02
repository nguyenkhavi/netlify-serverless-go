import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const userWallet = mysqlTable('user_wallet', {
  userId: varchar('user_id', { length: 12 }),
  wallet: varchar('wallet', { length: 64 }).primaryKey(),
});
