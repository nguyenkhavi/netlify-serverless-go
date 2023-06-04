import { sql } from 'drizzle-orm';
import { datetime, index, mysqlTable, varchar, int } from 'drizzle-orm/mysql-core';

export const token = mysqlTable(
  'token',
  {
    id: varchar('id', { length: 32 }).primaryKey(),
    createdAt: datetime('created_at').default(sql`NOW()`),
    updatedAt: datetime('updated_at'),

    tokenContract: varchar('token_contract', { length: 64 }),
    tokenSymbol: varchar('token_symbol', { length: 64 }),
    tokenName: varchar('token_name', { length: 64 }),
    tokenDecimal: int('token_decimal'),

    //Reference to table chain
    chainId: varchar('chain_id', { length: 32 }),
  },
  (table) => ({
    tokenIdIdx: index('token_id_idx').on(table.id),
  }),
);
