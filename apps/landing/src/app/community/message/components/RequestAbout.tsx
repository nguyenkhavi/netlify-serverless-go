//THIRD PARTY MODULES
import classcat from 'classcat';
import React, { useMemo } from 'react';
import { nextApi } from '_@landing/utils/api';
import urlWithIpfs from '_@landing/utils/urlWithIpfs';
import { Avatar, useChatContext } from 'stream-chat-react';
//LAYOUT, COMPONENTS
import Switch from '_@shared/components/conditions/Switch';
import { SkeImage, SkeLine } from '_@landing/components/skeleton/skeleton';

function RequestAbout() {
  const { channel } = useChatContext();

  const createdUser = useMemo(() => channel?.data?.created_by, [channel?.data?.created_by]) as any;
  const { data, isLoading, isFetching } = nextApi.getGetstreamUserInfo.useQuery(
    {
      targetGetstreamId: createdUser.id,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const {
    data: follow,
    isLoading: isLoadingMutual,
    isFetching: isFetchingMutual,
  } = nextApi.communityCountMutualFollow.useQuery(
    {
      targetGetstreamId: createdUser.id,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div
      className={classcat([
        'flex items-center justify-center px-4 pb-18 pt-20 md:h-full md:max-h-[calc(100vh-var(--header-height)-26rem)] md:px-8',
      ])}
    >
      <div className={classcat(['grid w-full items-center justify-items-center gap-1'])}>
        <Switch.Root>
          <Switch.Case when={isLoading || isFetching}>
            <SkeImage className="ow:h-14 ow:w-14 ow:rounded-full [&>svg]:ow:w-10" />
            <SkeLine className={classcat(['ow:h-5'])} />
            <SkeLine className={classcat(['ow:h-4'])} />
            <SkeLine />
            <SkeLine />
          </Switch.Case>
          <Switch.Case when={true}>
            <Avatar size={56} name={data?.username} image={urlWithIpfs(data?.avatarUrl)} />
            <p className={classcat(['text-h5-bold text-text-80'])}>{`@${data?.username ?? ''}`}</p>
            <p className={classcat(['text-body2 text-text-50'])}>{data?.aboutMe}</p>
            <div className={classcat(['grid items-center justify-items-center gap-1'])}>
              <p className={classcat(['text-body3 text-text-30'])}>
                {data?.followerNumber} Followers
              </p>
              <Switch.Root>
                <Switch.Case when={isLoadingMutual || isFetchingMutual}>
                  <SkeLine />
                </Switch.Case>
                <Switch.Case when={follow?.mutualFollowingNumber}>
                  <p className={classcat(['text-body3 text-text-30'])}>
                    Followed by {follow?.mutualFollowingNumber} people you’re following
                  </p>
                </Switch.Case>
                <Switch.Case when={!follow?.mutualFollowingNumber}>
                  <p className={classcat(['text-body3 text-text-30'])}>
                    Not followed by anyone you’re following
                  </p>
                </Switch.Case>
              </Switch.Root>
            </div>
          </Switch.Case>
        </Switch.Root>
      </div>
    </div>
  );
}

export default RequestAbout;
