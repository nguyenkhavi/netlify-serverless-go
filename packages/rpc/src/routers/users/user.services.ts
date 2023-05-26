import {
  TConnectIG,
  TConnectWallet,
  TCreateUserActivity,
  TSetKYC,
  CloseAllSession,
  CloseSession,
  Logout,
  TForgotPassword,
  TVerifyForgotPasswordToken,
} from './user.schemas';
import { obtainOauthAccessToken } from '_@rpc/services/twitter';
import { queryIGUserNode } from '../../services/instagram';
import { verifyInquiryId } from '../../services/persona';
import { getValidUser, updateInstagramUid, updatePersonaInquiryUid } from '../clerk/clerk.services';
import { generateSignedMessage } from '../../config/utils';
import {} from './user.schemas';
import { getIO } from '_@rpc/services/socket/socket';
import { clerkClient } from '@clerk/fastify';
import { ethers } from 'ethers';
import { Context } from '../../config/context';
import { TPaginationInput } from '../../config/schemas';
import { EActivityAction, Prisma } from '@prisma/client';
import { prisma } from '_@rpc/config/prisma';
import { generateResetPasswordToken, verifyResetPasswordToken } from '_@rpc/services/jwt';
import { TRPCError } from '@trpc/server';
import { redisClient } from '_@rpc/services/redis';
import { _30_SECONDS_ } from '_@rpc/constants/time';

export const connectInstagram = async (input: TConnectIG, uid: string) => {
  const instagramUser = await queryIGUserNode(input.code);
  return updateInstagramUid(uid, instagramUser.instagramUid);
};

export const setKYCInfo = async (input: TSetKYC, uid: string) => {
  await verifyInquiryId(input.inquiryId);
  return updatePersonaInquiryUid(uid, input.inquiryId);
};

export const connectWeb3Wallet = (input: TConnectWallet, uid: string) => {
  const message = generateSignedMessage(uid);
  const wallet = ethers.utils.verifyMessage(message, input.signature);
  return prisma.userWallet.create({
    data: {
      wallet,
      userId: uid,
    },
  });
};

export const createUserActivity = (
  input: TCreateUserActivity,
  userId: string,
  requestClient: Context['requestClient'],
) => {
  return prisma.userActivity.create({
    data: {
      browser: requestClient.userAgent.browser.name,
      ipAddress: requestClient.ipAddress,
      userId,
      action: input.action,
      location: input.location,
    },
  });
};

export const getUserActivities = async (input: TPaginationInput, userId: string) => {
  const { page, size } = input;

  const where: Prisma.UserActivityWhereInput = {
    userId,
  };

  const [data, total] = await Promise.all([
    prisma.userActivity.findMany({
      where,
      take: size,
      skip: (page - 1) * size,
    }),
    prisma.userActivity.count({ where }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      size,
    },
  };
};

export const twitterObtainOauthAccessToken = async (
  oauthVerifier: string,
  oauthToken: string,
  userId: string,
) => {
  const res = await obtainOauthAccessToken({
    oauthVerifier,
    oauthToken,
  });

  return clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      twitterId: res.user_id,
      twitterScreenName: res.screen_name,
    },
  });
};
export const closeSession = async (input: CloseSession) => {
  const io = getIO();
  const socket = io.sockets.sockets.get(input.socketId);

  const closedSession = await clerkClient.sessions.revokeSession(input.sessionId);

  socket?.emit('closeSession');

  return closedSession.id;
};

export const closeAllSession = async (input: CloseAllSession) => {
  const io = getIO();

  const socketSessionUsers = await io.in(input.userId).fetchSockets();

  const restSessionUser = socketSessionUsers.filter(
    (ssu) => ssu.data.sessionId !== input.currentSessionId,
  );

  const closedSessions = await Promise.all(
    restSessionUser.map((item) => clerkClient.sessions.revokeSession(item.data.sessionId)),
  );

  restSessionUser.forEach((item) => item.emit('closeSession'));

  return closedSessions;
};

export const logout = async (input: Logout) => {
  const io = getIO();
  const socket = io.sockets.sockets.get(input.socketId);
  await socket?.leave(input.userId);

  io.to(input.userId).emit('removeUserSession', input.currentSessionId);
};

const generateForgotPasswordUrl = (origin: string, token: string) => {
  return `${origin}/mail-handler/verify-email?token=${token}`;
};
const generateForgotPasswordRedisKey = (userId: string, token: string) => {
  return `forgot-password:${userId}:${token}`;
};
export const forgotPassword = async (
  input: TForgotPassword,
  requestClient: Context['requestClient'],
) => {
  const user = await getValidUser(input);
  const token = generateResetPasswordToken({ userId: user.id });
  const redisKey = generateForgotPasswordRedisKey(user.id, token);
  await redisClient.set(redisKey, input.newPassword, {
    EX: _30_SECONDS_,
  });
  const forgotPasswordUrl = generateForgotPasswordUrl(requestClient.origin, token);
  const sent = await clerkClient.emails.createEmail({
    emailAddressId: user.primaryEmailAddressId || '',
    fromEmailName: 'notifications@accounts.dev',
    body: `Forgot password link: ${forgotPasswordUrl}`,
    subject: `Forgot password link: ${forgotPasswordUrl}`,
  });
  return sent;
};

export const verifyForgotPasswordToken = async (
  input: TVerifyForgotPasswordToken,
  requestClient: Context['requestClient'],
) => {
  const { payload, valid } = verifyResetPasswordToken(input.token);
  if (!valid || !payload) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Token invalid',
    });
  }
  const redisKey = generateForgotPasswordRedisKey(payload.userId, input.token);

  const newPassword = await redisClient.get(redisKey);
  if (!newPassword) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Token invalid',
    });
  }
  await Promise.all([
    clerkClient.users.updateUser(payload.userId, {
      password: newPassword,
    }),
    createUserActivity(
      {
        action: EActivityAction.CHANGE_PASSWORD,
        location: null,
      },
      payload.userId,
      requestClient,
    ),
    redisClient.del(redisKey),
  ]);
  return true;
};
