//THIRD PARTY MODULES
import { jwtVerify } from 'jose';
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

const validate = async (session: string) => {
  try {
    if (!session) return { status: false } as const;
    await jwtVerify(session, new TextEncoder().encode(process.env.JWT_ACCESS_SECRET || ''));
    return { status: true } as const;
  } catch (e: any) {
    return {
      status: false,
      code: 'ERROR_EXPIRED',
    } as const;
  }
};
