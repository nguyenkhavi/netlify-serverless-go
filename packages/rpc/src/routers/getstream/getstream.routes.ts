import { router, publicProcedure } from '_@rpc/config/router';
import { generateGetstreamUserToken } from '../getstream/getstream.services';

export const getstreamRouters = router({
  getStreamGetUserToken: publicProcedure.mutation(({ ctx }) => generateGetstreamUserToken('minh1')),
});

export type GetstreamRouter = typeof getstreamRouters;
