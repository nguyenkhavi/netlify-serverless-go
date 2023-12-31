import { router, publicProcedure } from '_@rpc/config/router';
import { getPresignedUrl } from './aws.services';
import { getPresignedUrlSchema } from './aws.validator';

export const awsRouter = router({
  awsGetPresignedUrl: publicProcedure.input(getPresignedUrlSchema).query(async ({ input }) => {
    return getPresignedUrl(input);
  }),
});
