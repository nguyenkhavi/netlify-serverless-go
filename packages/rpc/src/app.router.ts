import { router } from './config/router';
import { userRouters } from './routers/users/user.routes';

export const appRouter = router({
  user: userRouters,
});

export type AppRouter = typeof appRouter;
