//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import { Avatar, useChatContext } from 'stream-chat-react';

function RequestAbout() {
  const { channel } = useChatContext();
  return (
    <div
      className={classcat([
        'flex items-center justify-center pb-18 pt-20 md:h-full md:max-h-[calc(100vh-var(--header-height)-26rem)]',
      ])}
    >
      <div className={classcat(['grid items-center justify-items-center gap-1'])}>
        <Avatar
          size={56}
          name={(channel?.data?.created_by as any)?.name}
          image={(channel?.data?.created_by as any)?.image}
        />
        <p className={classcat(['text-h5-bold text-text-80'])}>
          {(channel?.data?.created_by as any)?.name}
        </p>
        <p className={classcat(['text-body2 text-text-50'])}>Yes, We are always together</p>
        <div className={classcat(['grid items-center justify-items-center gap-1'])}>
          <p className={classcat(['text-body3 text-text-30'])}>200 Followers</p>
          <p className={classcat(['text-body3 text-text-30'])}>
            Not followed by anyone you’re following
          </p>
        </div>
      </div>
    </div>
  );
}

export default RequestAbout;
