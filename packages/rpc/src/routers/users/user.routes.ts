import { router, protectedRouter, publicProcedure } from '_@rpc/config/router';
// import { paginationSchema } from '../../config/schemas';

// import {
//   connectIGSchema,
//   connectWalletSchema,
//   createUserActivitySchema,
//   forgotPasswordSchema,
//   setKYCSchema,
//   closeSessionSchema,
//   closeAllSessionSchema,
//   logoutSchema,
//   verifyForgotPasswordTokenSchema,
//   createShippingAddressSchema,
//   updateShippingAddressSchema,
// } from '_@rpc/routers/users/user.schemas';
// import {
// connectInstagram,
// connectWeb3Wallet,
// createUserActivity,
// forgotPassword,
// getUserActivities,
// setKYCInfo,
// twitterObtainOauthAccessToken,
// logout,
// verifyForgotPasswordToken,
// closeSession,
// closeAllSession,
// } from './user.services';

import { requestToken } from '../../services/twitter';

export const userRouters = router({
  // 'user-connect-instagram': protectedRouter
  //   .input(connectIGSchema)
  //   .mutation(({ input, ctx }) => connectInstagram(input, ctx.auth.userId)),

  // 'user-set-KYC': protectedRouter
  //   .input(setKYCSchema)
  //   .mutation(({ input, ctx }) => setKYCInfo(input, ctx.auth.userId)),

  // 'user-connect-wallet': protectedRouter
  //   .input(connectWalletSchema)
  //   .mutation(({ input, ctx }) => connectWeb3Wallet(input, ctx.auth.userId)),
  // userCreateUserActivity: protectedRouter
  //   .input(createUserActivitySchema)
  //   .mutation(({ input, ctx }) => createUserActivity(input, ctx.auth.userId, ctx.requestClient)),
  // 'user-get-user-activities': protectedRouter
  //   .input(paginationSchema)
  //   .query(({ input, ctx }) => getUserActivities(input, ctx.auth.userId)),

  'user-twitter-request-token': protectedRouter.mutation(() => requestToken()),

  // userTwitterObtainOauthAccessToken: protectedRouter.mutation(async ({ ctx }) => {
  //   const query = ctx.req.query as Record<string, string>;

  //   return twitterObtainOauthAccessToken(
  //     query['oauth_verifier'],
  //     query['oauth_token'],
  //     ctx.auth.userId,
  //   );
  // }),

  // userCloseSession: protectedRouter
  //   .input(closeSessionSchema)
  //   .mutation(({ input }) => closeSession(input)),
  // userCloseSessionAll: protectedRouter
  //   .input(closeAllSessionSchema)
  //   .mutation(({ input }) => closeAllSession(input)),

  // 'user-logout': protectedRouter
  //   .input(logoutSchema)
  //   .mutation(({ input }) => console.log({ input })),
  // userForgotPassword: publicProcedure
  //   .input(forgotPasswordSchema)
  //   .mutation(({ input, ctx }) => forgotPassword(input, ctx.requestClient)),
  // userVerifyForgotPasswordToken: publicProcedure
  //   .input(verifyForgotPasswordTokenSchema)
  //   .mutation(({ input, ctx }) => verifyForgotPasswordToken(input, ctx.requestClient)),

  'user-greeting': publicProcedure.query(() => {
    // This is what you're returning to your client
    return {
      text: `💡 Tip: Try adding a new property here and see it propagate to the client straight-away`,
      //
    };
  }),
});

export type UserRouter = typeof userRouters;
