import { router, publicProcedure } from './../../config/router';
import { getPresignedUrl } from './aws.services';
import { getPresignedUrlSchema } from './aws.validator';

export const awsRouter = router({
  getPresignedUrl: publicProcedure.input(getPresignedUrlSchema).query(async ({ input }) => {
    return getPresignedUrl(input);
  }),
});
