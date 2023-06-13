import { router, protectedRouter } from '_@rpc/config/router';
import { revokeTokenSchema } from '_@rpc/routers/sessions/session.schemas';
import {
  listSession,
  revokeToken,
  userLogin,
  userLogout,
} from '_@rpc/routers/sessions/session.services';

export const sessionRouter = router({
  login: protectedRouter.mutation(async ({ ctx }) => {
    return userLogin(ctx.token, ctx.requestClient);
  }),
  logout: protectedRouter.mutation(async ({ ctx }) => {
    return userLogout(ctx.token);
  }),
  'list-session': protectedRouter.query(async ({ ctx }) => {
    return listSession(ctx.token);
  }),
  'revoke-session': protectedRouter.input(revokeTokenSchema).mutation(async ({ ctx, input }) => {
    return revokeToken(ctx.token, input);
  }),
});
