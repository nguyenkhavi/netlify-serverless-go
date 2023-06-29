'use client';

//THIRD PARTY MODULES
import { connect } from 'getstream';
import { nextApi } from '_@landing/utils/api';
import { PropsWithChildren, useEffect } from 'react';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import { getstreamStore, StreamType } from '_@landing/stores/getstreamStore';
//RELATIVE MODULES
import CommunityNav from './comps/CommunityNav';

export default function CommunityLayout({ children }: PropsWithChildren) {
  const { setFeedClient } = getstreamStore();
  const { data: token } = nextApi.getstreamGetUserToken.useQuery(undefined, { staleTime: 30000 });
  const { user } = useAuthStore();

  useEffect(() => {
    if (!token || !user) return;

    const _client = connect<StreamType>(
      process.env.NEXT_PUBLIC_GETSTREAM_API_KEY as string,
      token,
      process.env.NEXT_PUBLIC_GETSTREAM_APP_ID as string,
      {},
    );

    _client.user(user.profile.getstreamId).update({
      username: user.profile.username,
      avatar: user.profile.avatarUrl || '',
      aboutMe: user.profile.aboutMe || '',
    });

    setFeedClient(_client);
  }, [setFeedClient, token, user]);

  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-10 pt-4 md:px-8 lg:grid-cols-[17.5rem_1fr] lg:px-15">
      <div className="hidden lg:block">
        <CommunityNav />
      </div>
      <div>{children}</div>
    </div>
  );
}
