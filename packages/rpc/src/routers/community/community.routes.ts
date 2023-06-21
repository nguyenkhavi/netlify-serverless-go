import { communitySearchUserOrPostSchema, communityCreatePostSchema } from './community.schema';
import { router, protectedRouter } from '_@rpc/config/router';
import { communitySearchUserOrPost, communityCreatePost } from './community.services';

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
});

export type CommunityRouter = typeof communityRouters;
