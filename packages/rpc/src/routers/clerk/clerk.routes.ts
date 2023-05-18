import { clerkWebhookProcedure, router } from '../../config/router';

import { updateClerkUser } from './clerk.services';
import { EWebhookEventType } from './clerk.validators';

export const clerkRouter = router({
  userMutationWebhook: clerkWebhookProcedure.mutation(async ({ ctx }) => {
    const event = ctx.event;

    if (event.type === EWebhookEventType.USER_CREATED) {
      updateClerkUser(event.data);
    }
  }),
});
