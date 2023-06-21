import { searchHistory } from './../../drizzle/searchHistory';
import { userPostTable } from './../../drizzle/userPost';
import { getstreamFeedClient } from '_@rpc/services/getstream/getstream-client';
import { ilike, inArray, and, gte, lte, sql, isNotNull } from 'drizzle-orm';
import { db, userProfileTable } from '_@rpc/services/drizzle';
import { CommunitySearchUserOrPostInput, CommunityCreatePostInput } from './community.schema';

export const communityCreatePost = (
  input: CommunityCreatePostInput,
  getstreamId: string,
  userId: string,
) => {
  db.insert(userPostTable).values({
    userId,
    getstreamId,
    content: input.content,
    postId: input.postId,
  });
};

export const communitySearchUserOrPost = async (
  input: CommunitySearchUserOrPostInput,
  getstreamUserId: string,
  userId: string,
) => {
  storeSearchHistory(input.keyword, userId);

  switch (input.type) {
    case 'USER':
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

  const { results: followingFeed } = await getstreamFeedClient
    .feed('timeline', getstreamUserId)
    .following();

  //target_id have pattern {feed_group}:{getstream_id} exp: user:0x44258F4fA6c767dB5907bE6Cec9270843916BF36, split target_id to take the getstream_id
  const followingIds = followingFeed.map((item) => item.target_id.split(':')[1]);

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
        u.getstreamId === followingIds.find((id) => id === u.getstreamId && id !== getstreamUserId)
      ) {
        return { ...u, following: true };
      }
      return { ...u, following: false };
    });
  } else {
    qb.where(
      and(
        inArray(userProfileTable.getstreamId, followingIds),
        sql`lower(${userProfileTable.username}) like ${parsedKeyword}`,
        isNotNull(userProfileTable.userId),
      ),
    );

    const users = await qb.offset(paging.page - 1).limit(paging.pageSize);

    return users.map((u) => {
      return { ...u, following: true };
    });
  }
};

const searchPost = async (input: CommunitySearchUserOrPostInput, getstreamUserId: string) => {
  const { keyword, paging, peopleFilter, startDate, endDate } = input;
  const parsedKeyword = `${keyword}%`;

  const qb = db.select({ postId: userPostTable.postId }).from(userPostTable);

  if (startDate) {
    qb.where(gte(userPostTable.createdAt, startDate));
  }

  if (endDate) {
    qb.where(lte(userPostTable.createdAt, endDate));
  }

  if (peopleFilter === 'FOLLOWING') {
    const { results: followingFeed } = await getstreamFeedClient
      .feed('timeline', getstreamUserId)
      .following();

    //target_id have pattern {feed_group}:{getstream_id} exp: user:0x44258F4fA6c767dB5907bE6Cec9270843916BF36, split target_id to take the getstream_id
    const followingIds = followingFeed.map((item) => item.target_id.split(':')[1]);

    qb.where(
      and(
        sql`lower(${userPostTable.content}) like ${parsedKeyword}`,
        inArray(userPostTable.getstreamId, followingIds),
      ),
    ).orderBy(userPostTable.createdAt);
  } else {
    qb.where(sql`lower(${userPostTable.content}) like ${parsedKeyword}`).orderBy(
      userPostTable.createdAt,
    );
  }

  const data = await qb.offset(paging.page - 1).limit(paging.pageSize);

  const { results: posts } = await getstreamFeedClient.getActivities({
    ids: data.map((post) => post.postId),
    enrich: true,
  });

  return posts;
};
