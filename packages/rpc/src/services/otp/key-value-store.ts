// TODO: Customize some key-value store methods to make it easier to handle OTP logics
import { TRPCError } from '@trpc/server';
import { OTPType } from '_@rpc/drizzle/enum';
import { db, otpPendingTable } from '_@rpc/services/drizzle';
import * as dayjs from 'dayjs';
import { and, eq, gte } from 'drizzle-orm';

export const setCacheTOTPSecret = async (uid: string, value: string) => {
  const ext = Math.ceil(dayjs().add(30, 'minute').valueOf() / 1000);
  await db.transaction(async (tx) => {
    try {
      await deleteCacheTOTPSecret(uid);
      await tx.insert(otpPendingTable).values({
        uid,
        ext,
        value,
        type: OTPType.TIME,
      });
    } catch (e) {
      tx.rollback();
    }
  });
  return true;
};

export const getCacheTOTPSecret = async (uid: string) => {
  const ext = Math.ceil(dayjs().valueOf() / 1000);

  const totpPendings = await db
    .select()
    .from(otpPendingTable)
    .where(
      and(
        eq(otpPendingTable.type, OTPType.TIME),
        eq(otpPendingTable.uid, uid),
        gte(otpPendingTable.ext, ext),
      ),
    )
    .limit(1);
  if (!totpPendings.length) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'OTP Code is expired' });
  }
  const totpPending = totpPendings[0];
  return totpPending;
};

export const deleteCacheTOTPSecret = async (uid: string) => {
  await db
    .delete(otpPendingTable)
    .where(and(eq(otpPendingTable.type, OTPType.TIME), eq(otpPendingTable.uid, uid)));
  return true;
};
