'use client';
//THIRD PARTY MODULES
import 'stream-chat-react/dist/css/v2/index.css';
import React, { useEffect, useState } from 'react';
import { Channel as StreamChannel } from 'stream-chat';
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
import { useGetStreamUser } from '_@landing/hooks/useGetStreamUser';

function GetstreamDemo() {
  const { client } = useGetStreamUser();

  const [channel, setChannel] = useState<StreamChannel>();

  useEffect(() => {
    if (!client || !client.userID) return;
    const channel = client.channel('messaging', 'minh', {
      image: 'dave.png',
      name: 'Create a Messaging Channel',
    });
    setChannel(channel);
  }, [client]);

  if (!channel || !client || !client.userID) return null;

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
