//THIRD PARTY MODULES
import { create } from 'zustand';
import { StreamClient, FlatActivityEnriched } from 'getstream';

export type File = {
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

export type FlatActivityEnrichedType = FlatActivityEnriched<StreamType>;

interface GetstreamProps {
  feedClient: StreamClient<StreamType> | null;
  setFeedClient: (feedClient: StreamClient<StreamType>) => void;
}

export const getstreamStore = create<GetstreamProps>((set) => ({
  feedClient: null,
  setFeedClient: (feedClient: StreamClient<StreamType> | null) => {
    set({ feedClient });
  },
}));
