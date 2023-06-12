//SHARED
import validate from '_@shared/server/auth';
//HOOK
import { NextRequest, NextResponse } from 'next/server';

const loggedList = ['/auth'];
const authList = ['/profile'];

export default async function middleware(request: NextRequest) {
  const { headers, cookies } = request;
  headers.set('x-url', request.url);
  const url = new URL(request.url);

  const session = cookies.get('session')?.value;
  const isAuth = await validate(session);
  if (isAuth && loggedList.find((item) => request.url.includes(item))) {
    return NextResponse.redirect(`${url.origin}/profile`);
  }
  if (!isAuth && authList.find((item) => request.url.includes(item))) {
    return NextResponse.redirect(`${url.origin}/auth/sign-in`);
  }

  return NextResponse.next({
    headers,
  });
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
