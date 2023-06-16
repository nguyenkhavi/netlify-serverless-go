import { router } from '_@rpc/config/router';
import { clerkSessionWebhookProcedure, clerkUserWebhookProcedure } from './clerk.procedure';

import { updateClerkUser, updateSessionWhiteList } from './clerk.services';
import { EWebhookEventType } from './clerk.validators';

export const clerkRouter = router({
  clerkUserMutationWebhook: clerkUserWebhookProcedure.mutation(async ({ ctx }) => {
    const event = ctx.event;

    if (event.type === EWebhookEventType.USER_CREATED) {
      return updateClerkUser(event.data);
    }
  }),
  clerkSessionMutationWebhook: clerkSessionWebhookProcedure.mutation(async ({ ctx }) => {
    const event = ctx.event;
    return updateSessionWhiteList(event);
  }),
});
