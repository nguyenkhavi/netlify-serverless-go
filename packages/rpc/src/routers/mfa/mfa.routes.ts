import { router, protectedRouter } from '_@rpc/config/router';
import { turnOffTOTP, registerTOTP, verifyTOTP } from '_@rpc/routers/mfa/mfa.services';
import { verifyTOTPSchema } from '_@rpc/routers/mfa/mfa.schemas';

export const mfaRouters = router({
  registerTOTP: protectedRouter.mutation(({ ctx }) => registerTOTP(ctx.profile.userId)),
  verifyTOTP: protectedRouter
    .input(verifyTOTPSchema)
    .mutation(({ ctx, input }) => verifyTOTP(ctx.profile.userId, input)),
  turnOffTOTP: protectedRouter.mutation(({ ctx }) => turnOffTOTP(ctx.profile.userId)),
});

export type MFARouter = typeof mfaRouters;
