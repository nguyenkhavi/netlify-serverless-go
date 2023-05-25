import { awsRouter } from './routers/aws/aws.routes';
import { router } from './config/router';
import { userRouters } from './routers/users/user.routes';
import { clerkRouter } from './routers/clerk/clerk.routes';

export const appRouter = router({
  user: userRouters,
  clerk: clerkRouter,
  aws: awsRouter,
});

export type AppRouter = typeof appRouter;
