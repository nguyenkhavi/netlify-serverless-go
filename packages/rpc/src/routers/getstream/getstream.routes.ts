import { router, protectedRouter } from '_@rpc/config/router';
import { generateGetstreamUserToken } from '../getstream/getstream.services';

export const getstreamRouters = router({
  getstreamGetUserToken: protectedRouter.query(({ ctx }) =>
    generateGetstreamUserToken(ctx.profile.getstreamId),
  ),
});

export type GetstreamRouter = typeof getstreamRouters;
