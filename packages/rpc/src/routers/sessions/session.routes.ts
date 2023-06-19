import { router, protectedRouter, publicProcedure } from '_@rpc/config/router';
import { paginationSchema } from '_@rpc/config/schemas';
import {
  postSignupSchema,
  revokeTokenSchema,
  signInSchema,
  signupSchema,
  validateLoginSchema,
} from '_@rpc/routers/sessions/session.schemas';
import {
  getMyActivities,
  listSession,
  postSignUp,
  revokeAllToken,
  signUp,
  userLogin,
  userLogout,
  validateLogin,
} from '_@rpc/routers/sessions/session.services';

export const sessionRouter = router({
  login: publicProcedure.input(signInSchema).mutation(async ({ ctx, input }) => {
    return userLogin(input.didToken, ctx.requestClient);
  }),
  logout: protectedRouter.mutation(async ({ ctx }) => {
    return userLogout(ctx.token);
  }),
  listSession: protectedRouter.query(async ({ ctx }) => {
    return listSession(ctx.profile.userId);
  }),
  // revokeSession: protectedRouter.input(revokeTokenSchema).mutation(async ({ ctx, input }) => {
  //   return revokeToken(ctx.token, input);
  // }),
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
