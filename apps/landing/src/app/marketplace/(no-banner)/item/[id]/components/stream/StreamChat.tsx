'use client';
//THIRD PARTY MODULES
import { useEffect, useState } from 'react';
import 'stream-chat-react/dist/css/v2/index.css';
import { Channel as StreamChannel } from 'stream-chat';
import { Channel, Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
//HOOK
import { useGetStreamUser } from '_@landing/hooks/useGetStreamUser';
//RELATIVE MODULES
import './style.css';
import CustomMessage from './CustomMessage';
import CustomChannelHeader from './CustomHeader';
import { CustomMessageInput } from './CustomMessageInput';

function StreamChat() {
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
      <Channel channel={channel} Input={CustomMessageInput} Message={CustomMessage}>
        <Window>
          <CustomChannelHeader title="Join conversation" />
          <MessageList disableDateSeparator={true} />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}

export default StreamChat;
