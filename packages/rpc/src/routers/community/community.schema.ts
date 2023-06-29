import { z } from 'zod';

const PEOPLE_OPTION = {
  ANYONE: 'ANYONE',
  FOLLOWING: 'FOLLOWING',
} as const;

const SEARCH_TYPE = {
  ALL: 'ALL',
  ACCOUNT: 'ACCOUNT',
  POST: 'POST',
} as const;

export type SearchType = keyof typeof SEARCH_TYPE;
export type PeopleOptionType = keyof typeof PEOPLE_OPTION;

const paging = z.object({
  page: z.number(),
  pageSize: z.number(),
});

export type Paging = z.infer<typeof paging>;

export const communitySearchUserOrPostSchema = z.object({
  keyword: z.string(),
  type: z.nativeEnum(SEARCH_TYPE),
  peopleFilter: z.nativeEnum(PEOPLE_OPTION),
  from: z.string().pipe(z.coerce.date()).optional(),
  to: z.string().pipe(z.coerce.date()).optional(),
  paging,
});

export type CommunitySearchUserOrPostInput = z.infer<typeof communitySearchUserOrPostSchema>;

export const communityCreatePostSchema = z.object({
  postId: z.string(),
  content: z.string(),
});

export type CommunityCreatePostInput = z.infer<typeof communityCreatePostSchema>;

export const communityGetstreamIdSchema = z.object({
  targetGetstreamId: z.string(),
});

export type CommunityGetstreamIdInput = z.infer<typeof communityGetstreamIdSchema>;

export const communityGetstreamIdOf2UserSchema = z.object({
  targetGetstreamId: z.string(),
  getstreamId: z.string(),
});

export type CommunityGetstreamIdOf2UserInput = z.infer<typeof communityGetstreamIdOf2UserSchema>;
