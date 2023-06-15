import { TConnectIG, TSetKYC } from './user.schemas';
import { obtainOauthAccessToken } from '_@rpc/services/twitter';
import { queryIGUserNode } from '../../services/instagram';

import { addressTable, db, userProfileTable } from '_@rpc/services/drizzle';
import { and, eq } from 'drizzle-orm';
import { TProfile } from '_@rpc/drizzle/userProfile';
import { verifyInquiryId } from '_@rpc/services';

export const connectInstagram = async (input: TConnectIG, uid: string) => {
  const instagramUser = await queryIGUserNode(input.code);
  await db
    .update(userProfileTable)
    .set({ instagramUid: instagramUser.instagramUid })
    .where(eq(userProfileTable.userId, uid));
  return true;
};

export const setKYCInfo = async (input: TSetKYC, uid: string) => {
  await verifyInquiryId(input.inquiryId);
  await db
    .update(userProfileTable)
    .set({ personaInquiryId: input.inquiryId })
    .where(eq(userProfileTable.userId, uid));
  return true;
};

// export const connectWeb3Wallet = (input: TConnectWallet, uid: string) => {
//   const message = generateSignedMessage(uid);
//   const wallet = ethers.utils.verifyMessage(message, input.signature);
//   return true;
// };

export const twitterObtainOauthAccessToken = async (
  oauthVerifier: string,
  oauthToken: string,
  userId: string,
) => {
  const res = await obtainOauthAccessToken({
    oauthVerifier,
    oauthToken,
  });
  await db
    .update(userProfileTable)
    .set({ twitterUid: res.user_id })
    .where(eq(userProfileTable.userId, userId));
  return true;
};

export const verifiedPercentage = async (profile: TProfile) => {
  const { aboutMe, coverUrl, avatarUrl, description, twitterUid, instagramUid } = profile;
  const defaultAddresses = await db
    .select()
    .from(addressTable)
    .where(and(eq(addressTable.userId, profile.userId), eq(addressTable.isDefault, true)));
  const verifiedSteps = [
    {
      condition: aboutMe,
      score: 1,
    },
    {
      condition: coverUrl,
      score: 1,
    },
    {
      condition: avatarUrl,
      score: 1,
    },
    {
      condition: description,
      score: 1,
    },
    {
      condition: twitterUid && instagramUid,
      score: 1,
    },
    {
      condition: defaultAddresses.length > 0,
      score: 1,
    },
  ];
  const percentage = verifiedSteps.reduce((acc, cur) => {
    if (cur.condition) {
      acc += cur.score / verifiedSteps.length;
    }
    return acc;
  }, 0);
  return {
    percentage,
  };
};
