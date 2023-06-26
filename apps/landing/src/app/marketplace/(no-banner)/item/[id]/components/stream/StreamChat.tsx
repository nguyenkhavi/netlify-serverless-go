'use client';
//THIRD PARTY MODULES
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Channel as StreamChannel } from 'stream-chat';
import { Channel, Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
//HOOK
import { useGetStreamUser } from '_@landing/hooks/useGetStreamUser';
//RELATIVE MODULES
import './style.css';
import CustomMessage from './CustomMessage';
import CustomChannelHeader from './CustomHeader';
import { CHANNEL_NAME_PREFIX } from '../../constants';
import { CustomMessageInput } from './CustomMessageInput';

function StreamChat() {
  const { id } = useParams();
  const { client } = useGetStreamUser();

  const [channel, setChannel] = useState<StreamChannel>();

  useEffect(() => {
    if (!client) return;
    const _channel = client.channel('messaging', `${CHANNEL_NAME_PREFIX}${id}`, {
      image: '',
      name: 'Join conversation',
    });

    setChannel(_channel);
  }, [client, id]);

  if (!channel || !client) return null;

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
