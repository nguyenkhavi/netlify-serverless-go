import { followTable } from '_@rpc/drizzle/follow';
import { searchHistory } from '_@rpc/drizzle/searchHistory';
import { userPostTable } from '_@rpc/drizzle/userPost';
import { getstreamClient } from '_@rpc/services/getstream/getstream-client';
import { inArray, and, gte, lte, sql, isNotNull, eq } from 'drizzle-orm';
import { db, userProfileTable } from '_@rpc/services/drizzle';
import { CommunitySearchUserOrPostInput, CommunityCreatePostInput } from './community.schema';
import { TRPCError } from '@trpc/server';

export const communityCreatePost = async (
  input: CommunityCreatePostInput,
  getstreamId: string,
  userId: string,
) => {
  db.insert(userPostTable)
    .values({
      userId,
      getstreamId,
      content: input.content,
      postId: input.postId,
    })
    .execute();
};

export const communitySearchUserOrPost = async (
  input: CommunitySearchUserOrPostInput,
  getstreamUserId: string,
  userId: string,
) => {
  storeSearchHistory(input.keyword, userId);

  switch (input.type) {
    case 'ACCOUNT':
      return {
        users: await searchUser(input, getstreamUserId),
        posts: null,
      };

    case 'POST':
      return {
        users: null,
        posts: await searchPost(input, getstreamUserId),
      };
    case 'ALL':
      return {
        users: await searchUser(input, getstreamUserId),
        posts: await searchPost(input, getstreamUserId),
      };
    default:
      return {
        users: null,
        posts: null,
      };
  }
};

const storeSearchHistory = (keyword: string, userId: string) => {
  db.insert(searchHistory).values({ userId, keyword }).execute();
};

const searchUser = async (input: CommunitySearchUserOrPostInput, getstreamUserId: string) => {
  const { keyword, paging, peopleFilter } = input;

  const parsedKeyword = `%${keyword}%`;

  const followedUserIdsResult = await db
    .select({ followedUserIds: followTable.followedUserId })
    .from(followTable)
    .where(eq(followTable.followingUserId, getstreamUserId))
    .execute();

  const followedUserIds = followedUserIdsResult.map((item) => item.followedUserIds);

  const qb = db
    .select({
      username: userProfileTable.username,
      userId: userProfileTable.userId,
      aboutMe: userProfileTable.aboutMe,
      getstreamId: userProfileTable.getstreamId,
      avatar: userProfileTable.avatarUrl,
    })
    .from(userProfileTable);

  if (peopleFilter === 'ANYONE') {
    qb.where(
      and(
        sql`lower(${userProfileTable.username}) like ${parsedKeyword}`,
        isNotNull(userProfileTable.userId),
      ),
    );

    const users = await qb.offset(paging.page - 1).limit(paging.pageSize);

    // suggest create a `follow` table in database to get following, or followed user instead of using sdk to call
    return users.map((u) => {
      if (
        u.getstreamId ===
        followedUserIds.find((id) => id === u.getstreamId && id !== getstreamUserId)
      ) {
        return { ...u, following: true };
      }
      return { ...u, following: false };
    });
  } else {
    qb.where(
      and(
        inArray(userProfileTable.getstreamId, followedUserIds as Array<string>),
        sql`lower(${userProfileTable.username}) like ${parsedKeyword}`,
        isNotNull(userProfileTable.userId),
      ),
    );

    const users = await qb.offset(paging.page - 1).limit(paging.pageSize);

    return users.map((u) => ({ ...u, following: true }));
  }
};

const searchPost = async (input: CommunitySearchUserOrPostInput, getstreamUserId: string) => {
  const { keyword, paging, peopleFilter, from, to } = input;

  const qb = db.select({ postId: userPostTable.postId }).from(userPostTable);

  if (from) {
    qb.where(gte(userPostTable.createdAt, from));
  }

  if (to) {
    qb.where(lte(userPostTable.createdAt, to));
  }

  if (peopleFilter === 'FOLLOWING') {
    const followedUserIdsResult = await db
      .select({ followedUserIds: followTable.followedUserId })
      .from(followTable)
      .where(eq(followTable.followingUserId, getstreamUserId))
      .execute();

    const followedUserIds = followedUserIdsResult.map((item) => item.followedUserIds);

    qb.where(
      and(
        sql`MATCH(content) AGAINST(${keyword})`,
        inArray(userPostTable.getstreamId, followedUserIds as Array<string>),
      ),
    ).orderBy(userPostTable.createdAt);
  } else {
    qb.where(sql`MATCH(content) AGAINST(${keyword})`).orderBy(userPostTable.createdAt);
  }

  const data = await qb.offset(paging.page - 1).limit(paging.pageSize);

  if (!data.length) return [];

  const { results: posts } = await getstreamClient.getActivities({
    ids: data.map((post) => post.postId),
    enrich: true,
  });

  return posts;
};

export const communityFollowUser = async (getstreamId: string, targetGetstreamId: string) => {
  await db.transaction(async (tx) => {
    const data = await tx
      .insert(followTable)
      .values({ followingUserId: getstreamId, followedUserId: targetGetstreamId })
      .execute();

    if (!data.rowsAffected) {
      throw new TRPCError({ message: 'Something was wrong', code: 'BAD_REQUEST' });
    }

    await getstreamClient
      .feed('timeline', getstreamId)
      .follow('user', targetGetstreamId)
      .catch(() => {
        throw new TRPCError({ message: 'Something was wrong', code: 'BAD_REQUEST' });
      });
  });

  return { success: true };
};

export const communityUnfollowUser = async (getstreamId: string, targetGetstreamId: string) => {
  await db.transaction(async (tx) => {
    const data = await tx
      .delete(followTable)
      .where(
        and(
          eq(followTable.followingUserId, getstreamId),
          eq(followTable.followedUserId, targetGetstreamId),
        ),
      )
      .execute();

    if (!data.rowsAffected) {
      throw new TRPCError({ message: 'Something was wrong', code: 'BAD_REQUEST' });
    }

    await getstreamClient
      .feed('timeline', getstreamId)
      .unfollow('user', targetGetstreamId)
      .catch(() => {
        throw new TRPCError({ message: 'Something was wrong', code: 'BAD_REQUEST' });
      });
  });

  return { success: true };
};

export const communityCountMutualFollow = async (
  getstreamId: string,
  targetGetstreamId: string,
) => {
  const followedUserId = await db
    .select({ followedUserId: followTable.followedUserId })
    .from(followTable)
    .where(eq(followTable.followingUserId, getstreamId))
    .execute();

  if (!followedUserId.length) return { mutualFollowingNumber: 0 };

  const result = await db
    .select({ mutualFollowingNumber: sql`count(*)` })
    .from(followTable)
    .where(
      and(
        eq(followTable.followedUserId, targetGetstreamId),
        inArray(
          followTable.followingUserId,
          followedUserId.map((item) => item.followedUserId) as Array<string>,
        ),
      ),
    );

  return { mutualFollowingNumber: result[0].mutualFollowingNumber as number };
};

export const communityGetFollowingEachOtherInfo = async (
  getstreamId: string,
  targetGetstreamId: string,
) => {
  const [followingData, followedData] = await Promise.all([
    db
      .select({ id: followTable.followedUserId })
      .from(followTable)
      .where(
        and(
          eq(followTable.followingUserId, getstreamId),
          eq(followTable.followedUserId, targetGetstreamId),
        ),
      )
      .execute(),
    db
      .select({ id: followTable.followedUserId })
      .from(followTable)
      .where(
        and(
          eq(followTable.followingUserId, targetGetstreamId),
          eq(followTable.followedUserId, getstreamId),
        ),
      )
      .execute(),
  ]);

  return {
    following: Boolean(followingData.length),
    followed: Boolean(followedData.length),
  };
};

export const getGetstreamUserInfo = async (getstreamId: string) => {
  const [following, follower, userResult] = await Promise.all([
    communityGetUserFollowingNumber(getstreamId),
    communityGetUserFollowerNumber(getstreamId),
    db
      .select({
        userId: userProfileTable.userId,
        username: userProfileTable.username,
        aboutMe: userProfileTable.aboutMe,
        avatarUrl: userProfileTable.avatarUrl,
        coverUrl: userProfileTable.coverUrl,
      })
      .from(userProfileTable)
      .where(eq(userProfileTable.getstreamId, getstreamId))
      .execute(),
  ]);

  return {
    ...userResult[0],
    followingNumber: following.followingNumber,
    followerNumber: follower.followerNumber,
  };
};

export const communityGetUserFollowerNumber = async (getstreamId: string) => {
  const result = await db
    .select({ followerNumber: sql`count(*)` })
    .from(followTable)
    .where(eq(followTable.followedUserId, getstreamId))
    .execute();

  return {
    followerNumber: result[0].followerNumber as number,
  };
};

export const communityGetUserFollowingNumber = async (getstreamId: string) => {
  const result = await db
    .select({ followingNumber: sql`count(*)` })
    .from(followTable)
    .where(eq(followTable.followingUserId, getstreamId))
    .execute();

  return {
    followingNumber: result[0].followingNumber as number,
  };
};
