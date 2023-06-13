import { magicAdmin } from '_@rpc/services/magic.link';
import { db, session } from '_@rpc/services/drizzle';
import { eq, gt } from 'drizzle-orm';
import { RequestClient } from '_@rpc/config';
import { RevokeTokenInput } from '_@rpc/routers/sessions/session.schemas';
import { TRPCError } from '@trpc/server';

export const userLogin = async (token: string, requestClient: RequestClient) => {
  const [_, claim] = magicAdmin.token.decode(token);

  await db
    .insert(session)
    .values({
      ext: claim.ext,
      iss: claim.iss,
      token,
      ipAddress: requestClient.ipAddress,
      origin: requestClient.origin,
      userAgent: requestClient.userAgent.browser.name,
    })
    .execute();
  return true;
};

export const userLogout = async (token: string) => {
  await magicAdmin.users.logoutByToken(token);
  await db.delete(session).where(eq(session.token, token)).execute();
  return true;
};

export const listSession = async (token: string) => {
  const [_, claim] = magicAdmin.token.decode(token);
  const nowSeconds = Math.ceil(new Date().getTime() / 1000);
  const queryResult = await db
    .select()
    .from(session)
    .where(eq(session.iss, claim.iss))
    .where(gt(session.ext, nowSeconds))
    .execute();
  return queryResult;
};

export const revokeToken = async (token: string, { sessionId }: RevokeTokenInput) => {
  const records = await db
    .select()
    .from(session)
    .where(eq(session.id, sessionId))
    .limit(1)
    .execute();
  if (records.length) {
    const record = records[0];
    const [_, claim] = magicAdmin.token.decode(token);
    if (claim.iss !== record.iss) {
      throw new TRPCError({ code: 'BAD_REQUEST' });
    }
    return userLogout(record.token);
  }
};
