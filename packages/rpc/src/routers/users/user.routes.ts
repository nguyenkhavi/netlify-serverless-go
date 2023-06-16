import { router, protectedRouter, publicProcedure } from '_@rpc/config/router';

import { requestToken } from '../../services/twitter';
import {
  connectIGSchema,
  setKYCSchema,
  updateUserInformationSchema,
  userByWalletSchema,
} from '_@rpc/routers/users/user.schemas';
import {
  connectInstagram,
  getUserByWallet,
  setKYCInfo,
  twitterObtainOauthAccessToken,
  updatePersonalInfo,
  verifiedPercentage,
} from '_@rpc/routers/users/user.services';
import { getQuery } from '_@rpc/config';

export const userRouters = router({
  userConnectInstagram: protectedRouter
    .input(connectIGSchema)
    .mutation(({ input, ctx }) => connectInstagram(input, ctx.metadata.issuer || '')),

  userSetKYC: protectedRouter
    .input(setKYCSchema)
    .mutation(({ input, ctx }) => setKYCInfo(input, ctx.metadata.issuer || '')),

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
  getUserByWallet: publicProcedure.input(userByWalletSchema).query(({ input }) => {
    return getUserByWallet(input);
  }),
  updatePersonalInfo: protectedRouter
    .input(updateUserInformationSchema)
    .mutation(({ ctx, input }) => {
      return updatePersonalInfo(input, ctx.profile);
    }),
});

export type UserRouter = typeof userRouters;
