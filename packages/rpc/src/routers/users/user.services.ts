import {
  CreateShippingAddress,
  TConnectIG,
  TSetKYC,
  UpdateShippingAddress,
  TUserByWallet,
  UpdateUserInformation,
  CreateSuggestionInput,
  TUserWallets,
  GetPublicProfileInput,
} from './user.schemas';
import { obtainOauthAccessToken } from '_@rpc/services/twitter';
import { queryIGUserNode } from '_@rpc/services/instagram';

import { addressTable, db, userActivityTable, userProfileTable } from '_@rpc/services/drizzle';
import { and, eq, inArray } from 'drizzle-orm';
import { TProfile } from '_@rpc/drizzle/userProfile';
import { verifyInquiryId } from '_@rpc/services';
import { MySqlUpdateSetSource } from 'drizzle-orm/mysql-core';
import { suggestionTable } from '_@rpc/drizzle/suggestion';
import { TRPCError } from '@trpc/server';
import { getLocationDetail } from '_@rpc/services/ip2location/ip2location';
import { RequestClient } from '_@rpc/config';
import { ActivityAction } from '_@rpc/drizzle/enum';

export const connectInstagram = async (input: TConnectIG, uid: string) => {
  const instagramUser = await queryIGUserNode(input.code);
  await db
    .update(userProfileTable)
    .set({ instagramUid: instagramUser.instagramUid })
    .where(eq(userProfileTable.userId, uid));
  return true;
};

export const setKYCInfo = async (input: TSetKYC, uid: string, requestClient: RequestClient) => {
  await verifyInquiryId(input.inquiryId);
  const ip = requestClient.ipAddress;
  let location = '';
  if (ip) {
    const locationDetail = await getLocationDetail(ip);
    if (locationDetail && 'city' in locationDetail) {
      location = locationDetail.city;
    }
  }
  await db.transaction(async (ctx) => {
    await ctx
      .update(userProfileTable)
      .set({ personaInquiryId: input.inquiryId })
      .where(eq(userProfileTable.userId, uid));
    await ctx.insert(userActivityTable).values({
      userId: uid,
      ipAddress: requestClient.ipAddress,
      browser: requestClient.userAgent.browser.name,
      action: ActivityAction.SUBMIT_ID_VERIFICATION,
      location,
    });
  });

  return true;
};

// export const connectWeb3Wallet = (input: TConnectWallet, uid: string) => {
//   const message = generateSignedMessage(uid);
//   const wallet = ethers.utils.verifyMessage(message, input.signature);
//   return true;
// };

export const getUserByWallet = async (input: TUserByWallet) => {
  return db.select().from(userProfileTable).where(eq(userProfileTable.wallet, input.wallet));
};

export const getUsersInFleamint = async (input: TUserWallets) => {
  return db.select().from(userProfileTable).where(inArray(userProfileTable.wallet, input.wallets));
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

export const updatePersonalInfo = async (input: UpdateUserInformation, profile: TProfile) => {
  const dataSet: MySqlUpdateSetSource<typeof userProfileTable> = {};
  const { coverUrl, avatarUrl, aboutMe, description } = input;
  if (coverUrl) {
    dataSet.coverUrl = coverUrl;
  }
  if (avatarUrl) {
    dataSet.avatarUrl = avatarUrl;
  }
  if (aboutMe) {
    dataSet.aboutMe = aboutMe;
  }
  if (description) {
    dataSet.description = description;
  }
  await db.update(userProfileTable).set(dataSet).where(eq(userProfileTable.userId, profile.userId));
  return true;
};

export const userGetShippingAddressByUserId = async (userId: string) => {
  const data = await db.select().from(addressTable).where(eq(addressTable.userId, userId));

  return data[0];
};

export const userCreateShippingAddress = async (input: CreateShippingAddress, userId: string) => {
  const { isDefault } = input;

  return db.transaction(async (tx) => {
    if (isDefault) {
      await tx
        .update(addressTable)
        .set({ isDefault: false })
        .where(and(eq(addressTable.userId, userId), eq(addressTable.isDefault, true)))
        .execute();
    }

    return tx
      .insert(addressTable)
      .values({ ...input, userId })
      .execute();
  });
};

export const userUpdateShippingAddressById = async (
  input: UpdateShippingAddress,
  userId: string,
) => {
  const { id, ...data } = input;

  return db.transaction(async (tx) => {
    if (input.isDefault) {
      await tx
        .update(addressTable)
        .set({ isDefault: false })
        .where(eq(addressTable.userId, userId))
        .execute();
    }

    return tx
      .update(addressTable)
      .set({ ...data, userId })
      .where(eq(addressTable.id, id))
      .execute();
  });
};

export const userDeleteShippingAddressById = async (id: number) => {
  return db.delete(addressTable).where(eq(addressTable.id, id)).execute();
};

export const userCreateSuggestion = async (input: CreateSuggestionInput, userId: string) => {
  const { type, detail } = input;

  const suggestion = await db
    .insert(suggestionTable)
    .values({
      userId,
      detail,
      type,
    })
    .execute();
  return suggestion.insertId;
};

export const getPublicProfile = async (input: GetPublicProfileInput) => {
  const userProfiles = await db
    .select({
      username: userProfileTable.username,
      avatarUrl: userProfileTable.avatarUrl,
      userId: userProfileTable.userId,
      aboutMe: userProfileTable.aboutMe,
      description: userProfileTable.description,
      coverUrl: userProfileTable.coverUrl,
      firstName: userProfileTable.firstName,
      lastName: userProfileTable.lastName,
    })
    .from(userProfileTable)
    .where(eq(userProfileTable.userId, input.userId));
  if (!userProfiles.length) {
    throw new TRPCError({ code: 'NOT_FOUND' });
  }
  const userProfile = userProfiles[0];
  return { data: userProfile };
};
