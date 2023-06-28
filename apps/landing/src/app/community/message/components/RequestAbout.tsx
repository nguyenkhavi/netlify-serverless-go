//THIRD PARTY MODULES
import classcat from 'classcat';
import React, { useMemo } from 'react';
import { nextApi } from '_@landing/utils/api';
import { Avatar, useChatContext } from 'stream-chat-react';
//LAYOUT, COMPONENTS
import Switch from '_@shared/components/conditions/Switch';

function RequestAbout() {
  const { channel } = useChatContext();

  const createdUser = useMemo(() => channel?.data?.created_by, [channel?.data?.created_by]) as any;
  const { data } = nextApi.getGetstreamUserInfo.useQuery({
    targetGetstreamId: createdUser.id,
  });

  const { data: follow } = nextApi.communityCountMutualFollow.useQuery({
    targetGetstreamId: createdUser.id,
  });

  return (
    <div
      className={classcat([
        'flex items-center justify-center pb-18 pt-20 md:h-full md:max-h-[calc(100vh-var(--header-height)-26rem)]',
      ])}
    >
      <div className={classcat(['grid items-center justify-items-center gap-1'])}>
        <Avatar size={56} name={data?.username} image={data?.avatarUrl} />
        <p className={classcat(['text-h5-bold text-text-80'])}>{`@${data?.username ?? ''}`}</p>
        <p className={classcat(['text-body2 text-text-50'])}>{data?.aboutMe}</p>
        <div className={classcat(['grid items-center justify-items-center gap-1'])}>
          <p className={classcat(['text-body3 text-text-30'])}>{data?.followerNumber} Followers</p>
          <Switch.Root>
            <Switch.Case when={follow?.mutualFollowingNumber}>
              <p className={classcat(['text-body3 text-text-30'])}>
                Followed by {follow?.mutualFollowingNumber} people you’re following
              </p>
            </Switch.Case>
            <Switch.Case when={true}>
              <p className={classcat(['text-body3 text-text-30'])}>
                Not followed by anyone you’re following
              </p>
            </Switch.Case>
          </Switch.Root>
        </div>
      </div>
    </div>
  );
}

export default RequestAbout;
