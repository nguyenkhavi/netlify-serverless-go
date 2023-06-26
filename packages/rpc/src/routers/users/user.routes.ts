import { router, protectedRouter, publicProcedure } from '_@rpc/config/router';

import { requestToken } from '_@rpc/services/twitter';
import {
  connectIGSchema,
  setKYCSchema,
  updateUserInformationSchema,
  userByWalletSchema,
  createShippingAddressSchema,
  updateShippingAddressSchema,
  userDeleteShippingAddressSchema,
  createSuggestionSchema,
  userWallets,
  getPublicProfileSchema,
} from '_@rpc/routers/users/user.schemas';

import {
  connectInstagram,
  getUserByWallet,
  setKYCInfo,
  twitterObtainOauthAccessToken,
  updatePersonalInfo,
  userCreateShippingAddress,
  verifiedPercentage,
  userUpdateShippingAddressById,
  userGetShippingAddressByUserId,
  userDeleteShippingAddressById,
  userCreateSuggestion,
  getUsersInFleamint,
  getPublicProfile,
} from '_@rpc/routers/users/user.services';

import { getQuery } from '_@rpc/config';

export const userRouters = router({
  userConnectInstagram: protectedRouter
    .input(connectIGSchema)
    .mutation(({ input, ctx }) => connectInstagram(input, ctx.metadata.issuer || '')),

  userSetKYC: protectedRouter
    .input(setKYCSchema)
    .mutation(({ input, ctx }) => setKYCInfo(input, ctx.metadata.issuer || '', ctx.requestClient)),

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
  getUsersInFleamint: publicProcedure.input(userWallets).mutation(({ input }) => {
    return getUsersInFleamint(input);
  }),
  updatePersonalInfo: protectedRouter
    .input(updateUserInformationSchema)
    .mutation(({ ctx, input }) => {
      return updatePersonalInfo(input, ctx.profile);
    }),

  userGetShippingAddressByUserId: protectedRouter.query(({ ctx }) =>
    userGetShippingAddressByUserId(ctx.profile.userId),
  ),

  userCreateShippingAddress: protectedRouter
    .input(createShippingAddressSchema)
    .mutation(({ input, ctx }) => userCreateShippingAddress(input, ctx.profile.userId)),

  userUpdateShippingAddressById: protectedRouter
    .input(updateShippingAddressSchema)
    .mutation(({ input, ctx }) => userUpdateShippingAddressById(input, ctx.profile.userId)),

  userDeleteShippingAddress: protectedRouter
    .input(userDeleteShippingAddressSchema)
    .mutation(({ input }) => userDeleteShippingAddressById(input.id)),

  userCreateSuggestion: protectedRouter
    .input(createSuggestionSchema)
    .mutation(({ input, ctx }) => userCreateSuggestion(input, ctx.profile.userId)),
  getPublicProfile: publicProcedure
    .input(getPublicProfileSchema)
    .query(({ input }) => getPublicProfile(input)),
});

export type UserRouter = typeof userRouters;
