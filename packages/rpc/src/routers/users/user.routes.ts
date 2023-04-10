import { router, publicProcedure } from '_@rpc/config/router';

export const userRouters = router({
  hello: publicProcedure.query(() => {
    return 'Hello world! xxx';
  }),
});

export type UserRouter = typeof userRouters;
