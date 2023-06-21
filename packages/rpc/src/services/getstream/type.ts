type File = {
  url: string;
  alt: string;
};

type UserType = { username: string; avatar?: string; aboutMe?: string };

type ActivityType = {
  attachments?: File[];
  content: string;
  verb: string;
};

type CollectionType = { cid: string; rating?: number };
type ReactionType = { text: string };
type ChildReactionType = { text?: string };

export type StreamType = {
  userType: UserType;
  activityType: ActivityType;
  collectionType: CollectionType;
  reactionType: ReactionType;
  childReactionType: ChildReactionType;
  personalizationType: {};
};
