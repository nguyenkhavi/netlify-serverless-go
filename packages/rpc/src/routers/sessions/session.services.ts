import { magicAdmin } from '_@rpc/services/magic.link';
import { db, session, userActivityTable, userProfileTable } from '_@rpc/services/drizzle';
import { and, eq, isNotNull, or, sql } from 'drizzle-orm';
import { RequestClient } from '_@rpc/config';
import {
  PostSignUpInput,
  RevokeTokenInput,
  SignUpInput,
  ValidateLoginInput,
} from '_@rpc/routers/sessions/session.schemas';
import { TRPCError } from '@trpc/server';
import { ActivityAction } from '_@rpc/drizzle/enum';
import { TPaginationInput } from '_@rpc/config/schemas';
import { Profile } from '_@rpc/drizzle/userProfile';
import { getLocationDetail } from '_@rpc/services/ip2location/ip2location';
import { MagicUserMetadata } from '@magic-sdk/admin';
import { generateAccessToken } from '_@rpc/services/jwt';
import { verifyReCapchaToken } from '_@rpc/services/re-captcha';

export const userLogin = async (didToken: string, requestClient: RequestClient) => {
  magicAdmin.token.validate(didToken);
  const metadata = await magicAdmin.users.getMetadataByToken(didToken);

  const userId = metadata.issuer as string;

  const ip = requestClient.ipAddress;
  let location = '';
  if (ip) {
    const locationDetail = await getLocationDetail(ip);
    if (locationDetail && 'city' in locationDetail) {
      location = locationDetail.city;
    }
  }
  const { accessToken, ext } = generateAccessToken({ userId });

  await db.transaction(async (ctx) => {
    await ctx
      .insert(session)
      .values({
        ext,
        iss: userId,
        token: accessToken,
        ipAddress: ip,
        origin: requestClient.origin,
        userAgent: requestClient.userAgent.browser.name,
        location,
      })
      .execute();
    await ctx
      .insert(userActivityTable)
      .values({
        userId: userId,
        ipAddress: requestClient.ipAddress,
        browser: requestClient.userAgent.browser.name,
        action: ActivityAction.LOG_IN,
        location,
      })
      .execute();
  });

  return { accessToken };
};

export const userLogout = async (token: string) => {
  await db.delete(session).where(eq(session.token, token)).execute();
  return true;
};

export const listSession = async (userId: string) => {
  const queryResult = await db
    .select({
      iss: session.iss,
      createdAt: session.createdAt,
      ext: session.ext,
      userAgent: session.userAgent,
      ipAddress: session.ipAddress,
      origin: session.origin,
      id: session.id,
      location: session.location,
    })
    .from(session)
    .where(eq(session.iss, userId))
    .orderBy(sql`${session.createdAt} desc`)
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

export const revokeAllToken = async (metadata: MagicUserMetadata) => {
  const userId = metadata.issuer;
  const nowSeconds = Math.floor(new Date().getTime() / 1000);
  if (userId) {
    await db.update(session).set({ ext: nowSeconds }).where(eq(session.iss, userId)).execute();
  }
  return true;
};

export const signUp = async (input: SignUpInput) => {
  const { email, phone, username, lastName, firstName, dob, gender, reCaptchaToken } = input;
  const { phoneCode, phoneNumber } = phone;
  const reCapchaValid = await verifyReCapchaToken(reCaptchaToken);
  console.log({ reCapchaValid });
  if (!reCapchaValid) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'ReCapcha token is invalid!' });
  }

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
  magicAdmin.token.validate(input.didToken);
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
  const { accessToken, ext } = generateAccessToken({ userId: claim.iss });

  const wallet = magicAdmin.token.getPublicAddress(input.didToken);
  await db.transaction(async (ctx) => {
    const ip = requestClient.ipAddress;
    let location = '';
    if (ip) {
      const locationDetail = await getLocationDetail(ip);
      if (locationDetail && 'city' in locationDetail) {
        location = locationDetail.city;
      }
    }
    await ctx
      .update(userProfileTable)
      .set({ userId: claim.iss, wallet })
      .where(eq(userProfileTable.requestId, input.requestId));
    await ctx
      .insert(session)
      .values({
        ext,
        iss: claim.iss,
        token: accessToken,
        ipAddress: requestClient.ipAddress,
        origin: requestClient.origin,
        userAgent: requestClient.userAgent.browser.name,
        location,
      })
      .execute();
    await ctx
      .insert(userActivityTable)
      .values({
        userId: claim.iss,
        ipAddress: requestClient.ipAddress,
        browser: requestClient.userAgent.browser.name,
        action: ActivityAction.SIGN_UP,
        location,
      })
      .execute();
  });
  return { accessToken };
};

export const validateLogin = async (input: ValidateLoginInput) => {
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

export const getMyActivities = async (input: TPaginationInput, profile: Profile) => {
  const { size, page } = input;
  const whereSql = eq(userActivityTable.userId, profile.userId as string);
  const [data, total] = await Promise.all([
    db
      .select()
      .from(userActivityTable)
      .where(whereSql)
      .offset((page - 1) * size)
      .orderBy(sql`${userActivityTable.createdAt} desc`)
      .limit(size),
    db
      .select({ count: sql<number>`count(*)` })
      .from(userActivityTable)
      .where(whereSql)
      .then((result) => result[0].count || 0),
  ]);
  return {
    page,
    size,
    total,
    data,
  };
};
