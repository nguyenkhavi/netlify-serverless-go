import { router, publicProcedure, mergeRouter } from '_@rpc/config/router';
import { userRouters, clerkRouter, awsRouter, getstreamRouters } from './routers';
import { db, subscriber } from './services/drizzle';

export const test = router({
  greeting: publicProcedure.query(() => {
    return {
      text: `hello  'world'`,
    };
  }),
  'connection-drizzle': publicProcedure.query(async () => {
    const data = await db.select().from(subscriber).execute();
    return {
      data,
    };
  }),
});

export const appRouter = mergeRouter(test, userRouters, clerkRouter, awsRouter, getstreamRouters);

export type AppRouter = typeof appRouter;
