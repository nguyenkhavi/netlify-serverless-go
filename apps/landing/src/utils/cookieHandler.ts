//LAYOUT, COMPONENTS
import { cookies } from 'next/dist/client/components/headers';
//HOOK
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

function parseCookieToObject() {
  const cookie = document.cookie;
  return cookie.split(';').reduce((acc, curr) => {
    const [key, value] = curr.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
}

const cookiesFactory = () =>
  ({
    isWindow: typeof window !== 'undefined',
    cookies: typeof window !== 'undefined' ? parseCookieToObject() : cookies(),
  } as
    | {
        isWindow: true;
        cookies: Record<string, string>;
      }
    | {
        isWindow: false;
        cookies: ReadonlyRequestCookies;
      });

const cookieHandler = {
  get: (key: string) => {
    const cookiesInstance = cookiesFactory();
    if (cookiesInstance.isWindow) {
      return cookiesInstance.cookies[key];
    }
    return cookiesInstance.cookies.get(key)?.value;
  },
  set: (key: string, value: string) => {
    const cookiesInstance = cookiesFactory();
    if (cookiesInstance.isWindow) {
      document.cookie = `${key}=${value}; path=/;`;
      return;
    }
    throw new Error('Not implemented');
  },
  remove: (key: string) => {
    const cookiesInstance = cookiesFactory();
    if (cookiesInstance.isWindow) {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      return;
    }
    throw new Error('Not implemented');
  },
};

export default cookieHandler;
