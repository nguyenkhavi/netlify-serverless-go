import { TRPCError, initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';
import { createTRPCContext } from '../config/context';
import { decodeToken, isInWhiteList } from '../services/session';

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const mergeRouter = t.mergeRouters;

export const protectedRouter = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    const token = ctx.req.headers.cookie?.split('__session=')[1];
    const decoded = decodeToken(token);
    const userId = await isInWhiteList(decoded.sid);

    if (!userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
      ctx: {
        auth: { userId },
      },
    });
  }),
);
