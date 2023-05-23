import { clerkClient } from '@clerk/fastify';

import {
  ESessionEventType,
  SessionWebhookInput,
  UserCreatedWebhookInput,
} from './clerk.validators';
import { pushSessionToWhiteList, removeSessionFromWhiteList } from '../../services/session';

export function updateClerkUser(data: UserCreatedWebhookInput['data']) {
  return clerkClient.users.updateUser(data.id, {
    unsafeMetadata: {},
    publicMetadata: {
      dob: data.dob,
      gender: data.gender,
    },
  });
}

export function updateInstagramUid(uid: string, instagramUid: string) {
  return clerkClient.users.updateUserMetadata(uid, {
    publicMetadata: {
      instagramUid,
    },
  });
}

export function updatePersonaInquiryUid(uid: string, personaInquiryUid: string) {
  return clerkClient.users.updateUserMetadata(uid, {
    publicMetadata: {
      personaInquiryUid,
    },
  });
}

export const updateSessionWhiteList = (input: SessionWebhookInput) => {
  const { id, expiredAt, userId } = input.data;

  if (ESessionEventType.SESSION_CREATED === input.type) {
    pushSessionToWhiteList(id, userId, expiredAt);
  } else {
    removeSessionFromWhiteList(id);
  }
  return true;
};
