import { initTRPC } from '@trpc/server';

import { authenticateRequest } from '_@rpc/services/magic.link';
import { Context } from '_@rpc/config/context';

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const mergeRouter = t.mergeRouters;

export const protectedRouter = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    const req = ctx.req;
    const { metadata, token, profile } = await authenticateRequest(req);
    return next({
      ctx: { ...ctx, metadata, token, profile },
    });
  }),
);
