import { mysqlTable, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const chain = mysqlTable(
  'chain',
  {
    id: varchar('id', { length: 32 }),
    name: varchar('name', { length: 32 }),
    code: varchar('code', { length: 32 }),
    // collection: ,
    // token: ,
  },
  (table) => ({
    chainIdIDx: uniqueIndex('kyc_id_idx').on(table.id),
  }),
);
