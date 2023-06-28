'use client';
//THIRD PARTY MODULES
import { useSearchParams } from 'next/navigation';
import { checkChannelExistById } from '_@landing/utils/roomChat1vs1';
import { Channel, ChannelProps, useChatContext } from 'stream-chat-react';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
//RELATIVE MODULES
import '../style.css';
import Loading from './Loading';
import CustomMessage from './CustomMessage';
import CustomMessageInput from './CustomMessageInput';
import EmptyPlaceholderRequest from './EmptyPlaceholderRequest';
import CustomMessageInputRequest from './CustomMessageInputRequest';

type Props = ChannelProps & {
  refreshChannel: number;
  isRequest: boolean;
  onAcceptChat: () => void;
  onRejectChat: () => void;
};

function CustomChannel({
  children,
  isRequest,
  refreshChannel,
  onAcceptChat,
  onRejectChat,
  ...props
}: PropsWithChildren<Props>) {
  const [inviteUserIds, setInviteUserIds] = useState<string[]>([]);
  const { client, channel, setActiveChannel } = useChatContext();
  const searchParams = useSearchParams();
  const channelId = searchParams.get('channelId');

  const _queryInviteMembers = useCallback(() => {
    channel
      ?.queryMembers({
        invite: {
          $eq: 'pending',
        },
      })
      .then((rp) => {
        const members = rp.members?.map((item) => (item.user_id ? item.user_id.toString() : ''));
        setInviteUserIds(members);
      })
      .catch((err) => console.log(err));
  }, [channel]);

  const _setChannelByParam = useCallback(async () => {
    if (!channelId || !client) return;
    const channel = await checkChannelExistById(client, channelId);
    if (!channel) return;
    setActiveChannel(channel);
  }, [channelId, client, setActiveChannel]);

  useEffect(() => {
    _queryInviteMembers();
  }, [_queryInviteMembers]);

  useEffect(() => {
    if (!channel) return;
    const memberUpdateListener = channel.on('member.updated', () => _queryInviteMembers());
    return () => {
      memberUpdateListener.unsubscribe();
    };
  }, [_queryInviteMembers, channel]);

  useEffect(() => {
    _setChannelByParam();
  }, [_setChannelByParam]);

  return (
    <Channel
      key={`${refreshChannel}${inviteUserIds}`}
      Input={
        isRequest
          ? () => <CustomMessageInputRequest onAccept={onAcceptChat} onReject={onRejectChat} />
          : CustomMessageInput
      }
      Message={() => <CustomMessage inviteUserIds={inviteUserIds} />}
      LoadingIndicator={Loading}
      EmptyPlaceholder={isRequest ? <EmptyPlaceholderRequest /> : undefined}
      {...props}
    >
      {children}
    </Channel>
  );
}

export default CustomChannel;
