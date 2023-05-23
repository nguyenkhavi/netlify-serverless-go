import { TRPCError } from '@trpc/server';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { middleware, publicProcedure } from '../../config/router';
import { sessionWebhookSchema, userCreatedWebhookSchema } from './clerk.validators';
import { FastifyRequest } from 'fastify';

const verifyWebhook = (req: FastifyRequest, secret: string) => {
  const headers = req.headers as unknown as WebhookRequiredHeaders;
  const bodyString = `${req.body}`;
  if (!secret) {
    throw new Error('Missing CLERK_SIGNING_SECRET');
  }
  const wh = new Webhook(secret);
  try {
    wh.verify(bodyString, headers);
  } catch (err) {
    console.log({ err });

    throw new TRPCError({ code: 'BAD_REQUEST' });
  }
  return bodyString;
};

export const clerkUserWebhookProcedure = publicProcedure.use(
  middleware(async ({ ctx, next }) => {
    const bodyString = verifyWebhook(ctx.req, process.env.CLERK_USER_SIGNING_SECRET || '');
    const rawEvent = JSON.parse(bodyString);

    const event = await userCreatedWebhookSchema.parseAsync(rawEvent);

    return next({
      ctx: { event },
    });
  }),
);

export const clerkSessionWebhookProcedure = publicProcedure.use(
  middleware(async ({ ctx, next }) => {
    const bodyString = verifyWebhook(ctx.req, process.env.CLERK_SESSION_SIGNING_SECRET || '');
    const rawEvent = JSON.parse(bodyString);

    const event = await sessionWebhookSchema.parseAsync(rawEvent);

    return next({
      ctx: { event },
    });
  }),
);
