import { TRPCError } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { TProfile, userProfileTable } from '_@rpc/drizzle/userProfile';

import { db } from '_@rpc/services/drizzle';
import { verifyAccessToken } from '_@rpc/services/jwt';
import { magicAdmin } from '_@rpc/services/magic.link';
import { eq } from 'drizzle-orm';

export const authenticateRequest = async (req: FetchCreateContextFnOptions['req']) => {
  const authorization = req.headers.get('authorization');
  if (!authorization) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  try {
    const token = magicAdmin.utils.parseAuthorizationHeader(authorization);
    const userId = await verifyAccessToken(token);
    const metadata = await magicAdmin.users.getMetadataByIssuer(userId);
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
