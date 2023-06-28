import {
  communitySearchUserOrPostSchema,
  communityCreatePostSchema,
  communityGetstreamIdSchema,
  communityGetstreamIdOf2UserSchema,
} from './community.schema';
import { router, protectedRouter, publicProcedure } from '_@rpc/config/router';
import {
  communitySearchUserOrPost,
  communityCreatePost,
  communityFollowUser,
  communityUnfollowUser,
  communityCountMutualFollow,
  communityGetUserFollowerNumber,
  communityGetUserFollowingNumber,
  getGetstreamUserInfo,
  communityGetFollowingEachOtherInfo,
} from './community.services';

export const communityRouters = router({
  communityCreatePost: protectedRouter
    .input(communityCreatePostSchema)
    .mutation(({ input, ctx }) =>
      communityCreatePost(input, ctx.profile.getstreamId, ctx.profile.userId),
    ),

  communitySearchUserOrPost: protectedRouter
    .input(communitySearchUserOrPostSchema)
    .query(({ input, ctx }) =>
      communitySearchUserOrPost(input, ctx.profile.getstreamId, ctx.profile.userId),
    ),

  communityFollowUser: protectedRouter
    .input(communityGetstreamIdSchema)
    .mutation(({ input, ctx }) =>
      communityFollowUser(ctx.profile.getstreamId, input.targetGetstreamId),
    ),

  communityUnfollowUser: protectedRouter
    .input(communityGetstreamIdSchema)
    .mutation(({ input, ctx }) =>
      communityUnfollowUser(ctx.profile.getstreamId, input.targetGetstreamId),
    ),

  communityCountMutualFollow: protectedRouter
    .input(communityGetstreamIdSchema)
    .query(({ input, ctx }) =>
      communityCountMutualFollow(ctx.profile.getstreamId, input.targetGetstreamId),
    ),

  communityGetUserFollowerNumber: protectedRouter
    .input(communityGetstreamIdSchema)
    .query(({ input }) => communityGetUserFollowerNumber(input.targetGetstreamId)),

  communityGetUserFollowingNumber: protectedRouter
    .input(communityGetstreamIdSchema)
    .query(({ input }) => communityGetUserFollowingNumber(input.targetGetstreamId)),

  getGetstreamUserInfo: protectedRouter
    .input(communityGetstreamIdSchema)
    .query(({ input }) => getGetstreamUserInfo(input.targetGetstreamId)),

  communityGetFollowingEachOtherInfo: protectedRouter
    .input(communityGetstreamIdSchema)
    .query(({ input, ctx }) =>
      communityGetFollowingEachOtherInfo(ctx.profile.getstreamId, input.targetGetstreamId),
    ),
  communityGetFollowingEachOtherInfoOf2User: publicProcedure
    .input(communityGetstreamIdOf2UserSchema)
    .query(({ input }) =>
      communityGetFollowingEachOtherInfo(input.getstreamId, input.targetGetstreamId),
    ),
});

export type CommunityRouter = typeof communityRouters;
