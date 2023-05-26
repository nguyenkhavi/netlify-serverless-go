import { inferAsyncReturnType } from '@trpc/server';
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { FastifyRequest } from 'fastify';
import UAParser from 'ua-parser-js';

const getRequestClient = (req: FastifyRequest) => {
  const headers = req.headers;
  const browserString = headers['user-agent'];
  const parser = new UAParser(browserString); // you need to pass the user-agent for nodejs
  const userAgent = parser.getResult();
  const ipAddress = req['ip'];
  const origin = headers.origin as string;
  return { userAgent, ipAddress, origin };
};

export const createTRPCContext = async (opts: CreateFastifyContextOptions) => {
  const { req, res } = opts;

  return {
    req,
    res,
    requestClient: getRequestClient(req),
  };
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
