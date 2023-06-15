import { router, protectedRouter, publicProcedure } from '_@rpc/config/router';

import { requestToken } from '../../services/twitter';
import { connectIGSchema } from '_@rpc/routers/users/user.schemas';
import {
  connectInstagram,
  twitterObtainOauthAccessToken,
  verifiedPercentage,
} from '_@rpc/routers/users/user.services';
import { getQuery } from '_@rpc/config';

export const userRouters = router({
  'user-connect-instagram': protectedRouter
    .input(connectIGSchema)
    .mutation(({ input, ctx }) => connectInstagram(input, ctx.metadata.issuer || '')),

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

  'user-twitter-obtain-oath': protectedRouter.mutation(async ({ ctx }) => {
    const query = getQuery(ctx.req.url);

    return twitterObtainOauthAccessToken(
      query.get('oauth_verifier') || '',
      query.get('oauth_token') || '',
      ctx.metadata.issuer || '',
    );
  }),

  'user-greeting': publicProcedure.query(() => {
    // This is what you're returning to your client
    return {
      text: `💡 Tip: Try adding a new property here and see it propagate to the client straight-away`,
      //
    };
  }),
  'user-verified-percentage': protectedRouter.query(({ ctx }) => {
    return verifiedPercentage(ctx.profile);
  }),
});

export type UserRouter = typeof userRouters;
