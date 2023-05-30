'use client';
//THIRD PARTY MODULES
import React from 'react';
import 'stream-chat-react/dist/css/v2/index.css';
import {
  Channel,
  Chat,
  Thread,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
} from 'stream-chat-react';
//HOOK
import { useChannel } from '_@landing/hooks/useChannel';
import { useGetStreamUser } from '_@landing/hooks/useGetStreamUser';

function GetstreamDemo() {
  const { client, connected } = useGetStreamUser();
  const channel = useChannel({ id: 'channel-test', enable: connected });
  if (!channel) return null;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}

export default GetstreamDemo;
