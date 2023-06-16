import { router, protectedRouter } from '_@rpc/config/router';
import { generateGetstreamUserToken } from '../getstream/getstream.services';

export const getstreamRouters = router({
  getstreamGetUserToken: protectedRouter.mutation(({ ctx }) =>
    generateGetstreamUserToken(ctx.profile.wallet),
  ),
});

export type GetstreamRouter = typeof getstreamRouters;
