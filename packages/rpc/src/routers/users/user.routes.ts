import { router, publicProcedure } from '_@rpc/config/router';
import { connectIGSchema, setKYCSchema } from './user.schemas';
import { connectInstagram, setKYCInfo } from './user.services';
export const userRouters = router({
  hello: publicProcedure.query(() => {
    return 'Hello world! xxx';
  }),
  connectInstagram: publicProcedure
    .input(connectIGSchema)
    .mutation(({ input }) => connectInstagram(input)),
  setKYC: publicProcedure
    .input(setKYCSchema)
    .mutation(({ input }) => setKYCInfo(input)),
});

export type UserRouter = typeof userRouters;
