import { timestamp, index, mysqlTable, serial, varchar, text } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const userPostTable = mysqlTable(
  'user_post',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 52 }).notNull(),
    postId: varchar('post_id', { length: 52 }).notNull(),
    getstreamId: varchar('getstream_id', { length: 12 }).notNull(),
    content: text('content'),
    createdAt: timestamp('created_at').default(sql`NOW()`),
  },
  (userPost) => ({
    getstreamIdIndex: index('getstream_id_idx').on(userPost.getstreamId),
  }),
);
