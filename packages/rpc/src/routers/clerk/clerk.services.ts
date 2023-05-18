import { clerkClient } from '@clerk/fastify';

import { UserCreatedWebhookInput } from './clerk.validators';

export function updateClerkUser(data: UserCreatedWebhookInput['data']) {
  return clerkClient.users.updateUser(data.id, {
    unsafeMetadata: {},
    publicMetadata: {
      dob: data.dob,
      gender: data.gender,
    },
  });
}

export function connectInstagram(uid: string, instagramUid: string) {
  return clerkClient.users.updateUserMetadata(uid, {
    publicMetadata: {
      instagramUid,
    },
  });
}
