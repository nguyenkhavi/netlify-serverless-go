import { TConnectIG, TConnectWallet, TCreateUserActivity, TSetKYC } from './user.schemas';
import { queryIGUserNode } from '../../services/instagram';
import { verifyInquiryId } from '../../services/persona';
import { updateInstagramUid, updatePersonaInquiryUid } from '../clerk/clerk.services';
import { generateSignedMessage } from '../../config/utils';
import { ethers } from 'ethers';
import { prisma } from '../../config/prisma';
import { Context } from '../../config/context';
import { TPaginationInput } from '../../config/schemas';
import { Prisma } from '@prisma/client';
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
