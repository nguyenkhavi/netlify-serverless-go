import { router, protectedRouter } from '../../config/router';
import { generateGetstreamUserToken } from '../getstream/getstream.services';
export const getstreamRouters = router({
  generateGetstreamUserToken: protectedRouter.mutation(({ ctx }) =>
    generateGetstreamUserToken(ctx.auth.userId),
  ),
});

export type GetstreamRouter = typeof getstreamRouters;
