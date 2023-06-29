import { OTPTypeValues } from '_@rpc/drizzle/enum';
import { InferModel } from 'drizzle-orm';
import {
  mysqlTable,
  varchar,
  int,
  tinytext,
  uniqueIndex,
  primaryKey,
} from 'drizzle-orm/mysql-core';

export const otpPendingTable = mysqlTable(
  'otp_pending',
  {
    uid: varchar('uid', { length: 52 }).notNull(),
    type: varchar('type', { length: 20, enum: OTPTypeValues }).notNull(),
    value: tinytext('value').notNull(),
    ext: int('ext').notNull(),
  },
  (table) => ({
    uidTypeIndex: uniqueIndex('uid_type_idx').on(table.uid, table.type),
    pk: primaryKey(table.type, table.uid),
  }),
);

export type OtpPending = InferModel<typeof otpPendingTable, 'select'>;
export type NewOtpPending = InferModel<typeof otpPendingTable, 'insert'>;
