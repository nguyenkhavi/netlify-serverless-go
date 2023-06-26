import { router, protectedRouter } from '_@rpc/config/router';
import { purchaseSuccessSchema } from '_@rpc/routers/marketplace/marketplace.schemas';
import { purchaseSuccess } from '_@rpc/routers/marketplace/marketplace.services';

export const marketplaceRouters = router({
  purchaseSuccess: protectedRouter
    .input(purchaseSuccessSchema)
    .mutation(({ input, ctx }) => purchaseSuccess(input, ctx.profile)),
});

export type MarketplaceRouter = typeof marketplaceRouters;
