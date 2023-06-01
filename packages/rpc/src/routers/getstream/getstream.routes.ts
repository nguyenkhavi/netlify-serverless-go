import { router, protectedRouter, publicProcedure } from '_@rpc/config/router';
import { generateGetstreamUserToken } from '../getstream/getstream.services';

export const getstreamRouters = router({
  'getstream-get-user-token': publicProcedure.mutation(({ ctx }) =>
    generateGetstreamUserToken('minh1'),
  ),
});

export type GetstreamRouter = typeof getstreamRouters;
