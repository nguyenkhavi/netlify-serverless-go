import { router, protectedRouter, publicProcedure } from '_@rpc/config/router';
import {
  postSignupSchema,
  revokeTokenSchema,
  signupSchema,
  validateLoginSchema,
} from '_@rpc/routers/sessions/session.schemas';
import {
  listSession,
  postSignUp,
  revokeToken,
  signUp,
  userLogin,
  userLogout,
  validateLogin,
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
  signup: publicProcedure.input(signupSchema).mutation(async ({ ctx, input }) => {
    return signUp(input, ctx.requestClient);
  }),
  'post-signup': publicProcedure.input(postSignupSchema).mutation(async ({ ctx, input }) => {
    return postSignUp(input, ctx.requestClient);
  }),
  'validate-login': publicProcedure.input(validateLoginSchema).mutation(async ({ ctx, input }) => {
    return validateLogin(input, ctx.requestClient);
  }),
});
