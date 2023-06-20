//THIRD PARTY MODULES
import { and, eq, gt } from 'drizzle-orm';
import { db, session } from '_@rpc/services/drizzle';
//HOOK
import { NextRequest, NextResponse } from 'next/server';
const loggedList = ['/auth'];
const authList = ['/profile'];

export default async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const { headers, cookies } = request;
  const session = cookies.get('session')?.value || '';
  const loginStatus = await validate(session);

  headers.set('x-url', request.url);
  headers.set('x-is-logged-in', loginStatus.status ? 'true' : 'false');

  // TODO: Remove cookies if session is invalid
  if (loginStatus.code?.includes('ERROR')) {
    return NextResponse.redirect(`${url.origin}/auth/sign-in`, {
      headers: {
        'Set-Cookie': `session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
      },
    });
  }
  if (loginStatus.status && loggedList.find((item) => url.href.includes(item))) {
    return NextResponse.redirect(`${url.origin}/profile`, request);
  }
  if (!loginStatus.status && authList.find((item) => url.href.includes(item))) {
    return NextResponse.redirect(`${url.origin}/auth/sign-in`, request);
  }

  return NextResponse.next({
    headers,
  });
}

export const config = {
  matcher: ['/((?!_next|api|trpc|.*\\..*).*)'],
};

const validate = async (token: string) => {
  try {
    if (!token) return { status: false } as const;
    const nowSeconds = Math.ceil(new Date().getTime() / 1000);
    const sessions = await db
      .select()
      .from(session)
      .where(and(eq(session.token, token), gt(session.ext, nowSeconds)))
      .limit(1)
      .execute();

    if (!sessions.length) {
      throw new Error('ERROR_NOT_FOUND');
    }
    const { ext } = sessions[0];
    if (Number(ext ?? 0) - nowSeconds) {
      throw new Error('ERROR_EXPIRED');
    }

    return { status: true } as const;
  } catch (e: any) {
    return {
      status: false,
      code: e?.message || 'ERROR_ANY',
    } as const;
  }
};
