//THIRD PARTY MODULES
import { eq } from 'drizzle-orm';
import { RouterOutputs } from '_@landing/utils/api';
import { magicAdmin } from '_@rpc/services/magic.link';
import { db, userProfileTable } from '_@rpc/services/drizzle';
import { userLogout } from '_@rpc/routers/sessions/session.services';
//LAYOUT, COMPONENTS
import { cookies, headers } from 'next/dist/client/components/headers';
//HOOK

const getMyProfileOnServer = async () => {
  const headerReq = headers();
  const cookiesReq = cookies();
  const session = cookiesReq.get('session')?.value;
  const isLoggedIn = headerReq.get('x-is-logged-in') === 'true';
  const code = headerReq.get('x-auth-code') || '';

  if (session && code.includes('ERROR')) {
    await userLogout(session);
  }

  try {
    if (!isLoggedIn || !session) {
      throw new Error('UNAUTHORIZED');
    }

    const metadata = await magicAdmin.users.getMetadataByToken(session);

    const profiles = await db
      .select()
      .from(userProfileTable)
      .where(eq(userProfileTable.userId, metadata.issuer || ''))
      .limit(1)
      .execute();

    return {
      status: true,
      data: { metadata, profile: profiles[0] } as unknown as RouterOutputs['myProfile'],
    } as const;
  } catch (e: any) {
    return {
      status: false,
      message: e.code,
    } as const;
  }
};

export type GetMyProfileOnServer = Awaited<ReturnType<typeof getMyProfileOnServer>>;
export default getMyProfileOnServer;
