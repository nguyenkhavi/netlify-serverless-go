//THIRD PARTY MODULES
import 'react-activity-feed';
import { nextApi } from '_@landing/utils/api';
import { connect, StreamClient } from 'getstream';
import { useCallback, useEffect, useState } from 'react';
import useAuthStore from '_@landing/stores/auth/useAuthStore';

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

export const useGetFeedUser = () => {
  const [token, setToken] = useState<string>();
  const { user } = useAuthStore();
  const { mutate: getStreamToken } = nextApi.getstreamGetUserToken.useMutation({
    onSuccess: (data: string) => {
      setToken(data);
    },
  });

  const [client, setClient] = useState<StreamClient<StreamType>>();

  const initClient = useCallback(async () => {
    if (
      !process.env.NEXT_PUBLIC_GETSTREAM_API_KEY ||
      !token ||
      !process.env.NEXT_PUBLIC_GETSTREAM_APP_ID
    )
      return;

    const client = connect<StreamType>(
      process.env.NEXT_PUBLIC_GETSTREAM_API_KEY,
      token,
      process.env.NEXT_PUBLIC_GETSTREAM_APP_ID,
    );

    if (!user) return;

    client.setUser({
      username: user.profile.username,
      aboutMe: user?.profile.aboutMe || '',
      avatar: user.profile.avatarUrl || '',
    });

    setClient(client);
  }, [token, user]);

  useEffect(() => {
    getStreamToken();
  }, [getStreamToken]);

  useEffect(() => {
    initClient();
  }, [initClient]);

  return { client };
};
