import { Magic } from '@magic-sdk/admin';
import { TRPCError } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { TProfile, userProfileTable } from '_@rpc/drizzle/userProfile';

import { db } from '_@rpc/services/drizzle';
import { eq } from 'drizzle-orm';

export const magicAdmin = new Magic(process.env.MAGIC_SECRET_KEY || '');

export const authenticateRequest = async (req: FetchCreateContextFnOptions['req']) => {
  const authorization = req.headers.get('authorization');
  if (!authorization) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  try {
    const token = magicAdmin.utils.parseAuthorizationHeader(authorization);
    magicAdmin.token.validate(token);
    const metadata = await magicAdmin.users.getMetadataByToken(token);
    if (!metadata.issuer) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    const profiles = await db
      .select()
      .from(userProfileTable)
      .where(eq(userProfileTable.userId, metadata.issuer))
      .limit(1)
      .execute();
    if (!profiles.length) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return {
      metadata,
      token,
      profile: profiles[0] as TProfile,
    };
  } catch (e) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
};
