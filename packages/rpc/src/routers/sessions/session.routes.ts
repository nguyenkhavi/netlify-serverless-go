import { router, protectedRouter, publicProcedure } from '_@rpc/config/router';
import { paginationSchema } from '_@rpc/config/schemas';
import {
  postSignupSchema,
  revokeTokenSchema,
  signupSchema,
  validateLoginSchema,
} from '_@rpc/routers/sessions/session.schemas';
import {
  getMyActivities,
  listSession,
  postSignUp,
  revokeAllToken,
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
  listSession: protectedRouter.query(async ({ ctx }) => {
    return listSession(ctx.token);
  }),
  revokeSession: protectedRouter.input(revokeTokenSchema).mutation(async ({ ctx, input }) => {
    return revokeToken(ctx.token, input);
  }),
  revokeAllSession: protectedRouter.input(revokeTokenSchema).mutation(async ({ ctx }) => {
    return revokeAllToken(ctx.metadata);
  }),
  signup: publicProcedure.input(signupSchema).mutation(async ({ input }) => {
    return signUp(input);
  }),
  postSignup: publicProcedure.input(postSignupSchema).mutation(async ({ ctx, input }) => {
    return postSignUp(input, ctx.requestClient);
  }),
  validateLogin: publicProcedure.input(validateLoginSchema).mutation(async ({ input }) => {
    return validateLogin(input);
  }),
  myProfile: protectedRouter.query(async ({ ctx }) => {
    return {
      metadata: ctx.metadata,
      profile: ctx.profile,
    };
  }),
  myActivities: protectedRouter.input(paginationSchema).query(async ({ ctx, input }) => {
    return getMyActivities(input, ctx.profile);
  }),
});
