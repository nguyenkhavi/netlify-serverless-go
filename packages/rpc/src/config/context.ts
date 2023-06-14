import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { getClientIpFromXForwardedFor } from '_@rpc/config/utils';
import * as UAParser from 'ua-parser-js';

const getRequestClient = (req: FetchCreateContextFnOptions['req']) => {
  const headers = req.headers;
  const browserString = headers.get('user-agent') || '';
  const parser = new UAParser(browserString); // you need to pass the user-agent for nodejs
  const userAgent = parser.getResult();
  const xForwardedFor = req.headers.get('x-forwarded-for') as string;
  const ipAddress = getClientIpFromXForwardedFor(xForwardedFor);
  const origin = headers.get('origin') as string;

  return { userAgent, ipAddress, origin };
};

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const { req } = opts;

  return {
    req,
    requestClient: getRequestClient(req),
  };
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
export type RequestClient = Context['requestClient'];
