import { clerkClient } from '@clerk/nextjs';
import { TRPCError, initTRPC } from '@trpc/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';
export interface Context {
  auth?: {
    userId: string;
  };
  req: NextRequest;
}

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

    const cookies = parse(ctx.req.headers.get('cookie') || '');
    const cookieToken = cookies['__session'];

    const authorization = ctx.req.headers.get('authorization');
    const headerToken = authorization ? authorization.replace('Bearer ', '') : '';

    const token = cookieToken || headerToken;
    if (!token) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const request = await clerkClient.authenticateRequest({
      headerToken: headerToken,
      cookieToken: token,
      apiKey: process.env.CLERK_PUBLISHABLE_KEY || '',
      secretKey: process.env.CLERK_SECRET_KEY || '',
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
      host: '',
      frontendApi: '',
    });
    const auth = request.toAuth();
    if (!auth?.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

    return next({
      ctx: { auth },
    });
  }),
);
