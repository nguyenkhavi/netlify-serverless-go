import { inferAsyncReturnType } from '@trpc/server';
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

const createInnerTRPCContext = () => {
  return {};
};

export const createTRPCContext = async (opts: CreateFastifyContextOptions) => {
  const { req, res } = opts;

  return {
    req,
    res,
    ...createInnerTRPCContext(),
    session: {} as any,
  };
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
