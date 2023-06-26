import { mysqlTable, varchar, primaryKey } from 'drizzle-orm/mysql-core';

export const followTable = mysqlTable(
  'follow',
  {
    followedUserId: varchar('followed_user_id', { length: 12 }),
    followingUserId: varchar('following_user_id', { length: 12 }),
  },
  (follow) => ({
    pk: primaryKey(follow.followedUserId, follow.followingUserId),
  }),
);
