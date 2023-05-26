import { clerkClient } from '@clerk/fastify';
import dayjs from 'dayjs';
import {
  ESessionEventType,
  SessionWebhookInput,
  UserCreatedWebhookInput,
} from './clerk.validators';
import { pushSessionToWhiteList, removeSessionFromWhiteList } from '../../services/session';
import { TForgotPassword } from '_@rpc/routers/users/user.schemas';
import { TRPCError } from '@trpc/server';

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

export const getValidUser = async (input: TForgotPassword) => {
  const users = await clerkClient.users.getUserList({
    emailAddress: [input.email],
    phoneNumber: [`+${input.phone.phoneCode}${input.phone.phoneNumber}`],
    username: [input.username],
    limit: 1,
  });
  if (!users.length) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Information do not match what we have on record',
    });
  }
  const user = users[0];
  if (user.banned) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'User banned',
    });
  }
  const publicMetadata = user.publicMetadata;
  const dob = publicMetadata['dob'] as string;
  const dobMatch = dayjs(dob).isSame(dayjs(input.dob), 'day');
  if (!dobMatch) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Information do not match what we have on record',
    });
  }

  return user;
};
