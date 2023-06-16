import { router, publicProcedure, mergeRouter } from '_@rpc/config/router';
import { userRouters, awsRouter, getstreamRouters, sessionRouter } from './routers';
import { db, subscriber } from './services/drizzle';

export const test = router({
  greeting: publicProcedure.query(() => {
    return {
      text: `hello  'world'`,
    };
  }),
  connectionDrizzle: publicProcedure.query(async () => {
    const data = await db.select().from(subscriber).execute();
    return {
      data,
    };
  }),
});

export const appRouter = mergeRouter(test, userRouters, awsRouter, getstreamRouters, sessionRouter);

export type AppRouter = typeof appRouter;
