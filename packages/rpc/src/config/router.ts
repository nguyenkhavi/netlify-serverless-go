import { TRPCError, initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { userCreatedWebhookSchema } from '../routers/clerk/clerk.validators';
import { createTRPCContext } from '_@rpc/config/context';
import { getAuth } from '@clerk/fastify';

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
    const auth = getAuth(ctx.req);
    if (!auth.userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
      ctx: {
        auth,
      },
    });
  })
);

export const clerkWebhookProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    const req = ctx.req;

    const headers = req.headers as unknown as WebhookRequiredHeaders;
    const bodyString = `${req.body}`;
    const clerkWebhookSecret: string = process.env.CLERK_SIGNING_SECRET || '';
    if (!clerkWebhookSecret) {
      throw new Error('Missing CLERK_SIGNING_SECRET in .env');
    }
    const wh = new Webhook(clerkWebhookSecret);
    try {
      wh.verify(bodyString, headers);
    } catch (err) {
      console.log({ err });

      throw new TRPCError({ code: 'BAD_REQUEST' });
    }

    const rawEvent = JSON.parse(bodyString);

    const event = await userCreatedWebhookSchema.parseAsync(rawEvent);

    return next({
      ctx: { event },
    });
  })
);
