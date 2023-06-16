import { router, protectedRouter, publicProcedure } from '_@rpc/config/router';

import { requestToken } from '../../services/twitter';
import { connectIGSchema, setKYCSchema } from '_@rpc/routers/users/user.schemas';
import {
  connectInstagram,
  setKYCInfo,
  twitterObtainOauthAccessToken,
  verifiedPercentage,
} from '_@rpc/routers/users/user.services';
import { getQuery } from '_@rpc/config';

export const userRouters = router({
  userConnectInstagram: protectedRouter
    .input(connectIGSchema)
    .mutation(({ input, ctx }) => connectInstagram(input, ctx.metadata.issuer || '')),

  'user-set-KYC': protectedRouter
    .input(setKYCSchema)
    .mutation(({ input, ctx }) => setKYCInfo(input, ctx.metadata.issuer || '')),

  // 'user-connect-wallet': protectedRouter
  //   .input(connectWalletSchema)
  //   .mutation(({ input, ctx }) => connectWeb3Wallet(input, ctx.auth.userId)),
  // userCreateUserActivity: protectedRouter
  //   .input(createUserActivitySchema)
  //   .mutation(({ input, ctx }) => createUserActivity(input, ctx.auth.userId, ctx.requestClient)),
  // 'user-get-user-activities': protectedRouter
  //   .input(paginationSchema)
  //   .query(({ input, ctx }) => getUserActivities(input, ctx.auth.userId)),

  userTwitterRequestToken: protectedRouter.mutation(() => requestToken()),

  userTwitterObtainOath: protectedRouter.mutation(async ({ ctx }) => {
    const query = getQuery(ctx.req.url);

    return twitterObtainOauthAccessToken(
      query.get('oauth_verifier') || '',
      query.get('oauth_token') || '',
      ctx.metadata.issuer || '',
    );
  }),
  userVerifiedPercentage: protectedRouter.query(({ ctx }) => {
    return verifiedPercentage(ctx.profile);
  }),
});

export type UserRouter = typeof userRouters;
