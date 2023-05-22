import { TConnectIG, TConnectWallet, TSetKYC } from './user.schemas';
import { queryIGUserNode } from '../../services/instagram';
import { verifyInquiryId } from '../../services/persona';
import {
  updateInstagramUid,
  updatePersonaInquiryUid,
} from '_@rpc/routers/clerk/clerk.services';
import { generateSignedMessage } from '../../config/utils';
import { ethers } from 'ethers';
import { prisma } from '../../config/prisma';
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
      chainId: 'chain-id',
    },
  });
};
