import { magicAdmin } from '_@rpc/services/magic.link';
import { db, session, userProfileTable } from '_@rpc/services/drizzle';
import { and, eq, gt, isNotNull, or } from 'drizzle-orm';
import { RequestClient } from '_@rpc/config';
import {
  PostSignUpInput,
  RevokeTokenInput,
  SignUpInput,
  ValidateLoginInput,
} from '_@rpc/routers/sessions/session.schemas';
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

export const signUp = async (input: SignUpInput, requestClient: RequestClient) => {
  const { email, phone, username, lastName, firstName, dob, gender } = input;
  const { phoneCode, phoneNumber } = phone;
  const conflictUser = await db
    .select()
    .from(userProfileTable)
    .where(
      and(
        or(
          eq(userProfileTable.email, email),
          eq(userProfileTable.username, username),
          and(
            eq(userProfileTable.phoneCode, phoneCode),
            eq(userProfileTable.phoneNumber, phoneNumber),
          ),
        ),
        isNotNull(userProfileTable.userId),
      ),
    )
    .limit(1)
    .execute();
  if (conflictUser.length) {
    throw new TRPCError({ code: 'CONFLICT', message: 'User with credential already exist!' });
  }
  const userProfile = await db
    .insert(userProfileTable)
    .values({
      email,
      username,
      phoneCode,
      phoneNumber,
      lastName,
      firstName,
      dob: new Date(dob),
      gender,
    })
    .execute();
  return +userProfile.insertId;
};

export const postSignUp = async (input: PostSignUpInput, requestClient: RequestClient) => {
  const profiles = await db
    .select()
    .from(userProfileTable)
    .where(eq(userProfileTable.requestId, input.requestId))
    .limit(1)
    .execute();
  if (!profiles.length) {
    throw new TRPCError({ code: 'BAD_REQUEST' });
  }
  const [_, claim] = magicAdmin.token.decode(input.didToken);

  await db.transaction(async (ctx) => {
    await ctx
      .update(userProfileTable)
      .set({ userId: claim.iss })
      .where(eq(userProfileTable.requestId, input.requestId));
    await ctx
      .insert(session)
      .values({
        ext: claim.ext,
        iss: claim.iss,
        token: input.didToken,
        ipAddress: requestClient.ipAddress,
        origin: requestClient.origin,
        userAgent: requestClient.userAgent.browser.name,
      })
      .execute();
  });
  return true;
};

export const validateLogin = async (input: ValidateLoginInput, requestClient: RequestClient) => {
  const { phone } = input;
  const { phoneCode, phoneNumber } = phone;

  const profiles = await db
    .select()
    .from(userProfileTable)
    .where(
      and(eq(userProfileTable.phoneCode, phoneCode), eq(userProfileTable.phoneNumber, phoneNumber)),
    )
    .limit(1)
    .execute();
  if (!profiles.length) {
    throw new TRPCError({ code: 'BAD_REQUEST' });
  }
  return true;
};
