import { router } from '_@rpc/config/router';
import { clerkSessionWebhookProcedure, clerkUserWebhookProcedure } from './clerk.procedure';

import { updateClerkUser, updateSessionWhiteList } from './clerk.services';
import { EWebhookEventType } from './clerk.validators';

export const clerkRouter = router({
  'clerk-user-mutation-webhook': clerkUserWebhookProcedure.mutation(async ({ ctx }) => {
    const event = ctx.event;

    if (event.type === EWebhookEventType.USER_CREATED) {
      return updateClerkUser(event.data);
    }
  }),
  'clerk-session-mutation-webhook': clerkSessionWebhookProcedure.mutation(async ({ ctx }) => {
    const event = ctx.event;
    return updateSessionWhiteList(event);
  }),
});
