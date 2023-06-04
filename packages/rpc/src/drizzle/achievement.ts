import { sql } from 'drizzle-orm';
import { datetime, mysqlTable, varchar, index, int } from 'drizzle-orm/mysql-core';

export const achievement = mysqlTable(
  'achievement',
  {
    id: varchar('id', { length: 32 }).primaryKey(),
    createdAt: datetime('created_at').default(sql`NOW()`),
    updatedAt: datetime('updated_at'),

    totalVolume: int('total_volume'),
    project: int('project'),
    globalPartner: int('global_partner'),
    totalUser: int('total_user'),
  },
  (table) => ({
    projectIndex: index('suggestion_user_id_idx').on(table.project),
  }),
);
