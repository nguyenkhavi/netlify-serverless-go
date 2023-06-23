//THIRD PARTY MODULES
import dayjs from 'dayjs';
import classcat from 'classcat';
import { Channel } from 'stream-chat';
import { PropsWithChildren, useEffect } from 'react';
import { DefaultStreamChatGenerics } from 'stream-chat-react/dist/types/types';
import {
  ChannelList,
  ChannelListMessengerProps,
  ChannelPreview,
  ChannelPreviewProps,
  ChatDownProps,
  useChatContext,
} from 'stream-chat-react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
//SHARED
import LoadingIcon from '_@shared/icons/LoadingIcon';
//RELATIVE MODULES
import CustomChannelPreview from './CustomChannelPreview';

//RELATIVE MODULES

function CustomChannelList({
  refresh,
  search,
  isRequest,
  onSelectChannel,
}: {
  refresh: string;
  search: string;
  isRequest: boolean;
  onSelectChannel: () => void;
}) {
  const { setActiveChannel } = useChatContext();

  const _onSelectChannel = (channel: Channel<DefaultStreamChatGenerics>) => {
    onSelectChannel();
    setActiveChannel(channel);
  };

  const CustomList = (props: PropsWithChildren<ChannelListMessengerProps>) => {
    const { children, error, loading, LoadingErrorIndicator, LoadingIndicator } = props;

    if (error && LoadingErrorIndicator) {
      return (
        <LoadingErrorIndicator text="Loading Error - check your connection." type="connection" />
      );
    }

    if (loading && LoadingIndicator) {
      return <LoadingIndicator />;
    }

    return (
      <div
        className={classcat([
          'scrollbar overflow-auto py-4',
          'md:h-[calc(100vh-var(--header-height)-11rem)]',
        ])}
      >
        {children}
      </div>
    );
  };

  const CustomErrorIndicator = (props: ChatDownProps) => {
    const { text } = props;

    return (
      <div className={classcat(['flex h-full items-center justify-center py-10'])}>
        {<p className={classcat(['text-body2 text-text-50'])}>{text}</p>}
      </div>
    );
  };

  const CustomLoadingIndicator = () => {
    return (
      <div className={classcat(['flex h-full items-center justify-center py-10'])}>
        <LoadingIcon className="animate-spin" />
      </div>
    );
  };

  const CustomPreview = (props: ChannelPreviewProps) => {
    return (
      <div className={classcat(['relative'])}>
        <ChannelPreview
          onSelect={() => _onSelectChannel(props.channel)}
          channel={props.channel}
          className={classcat([
            '[&>div>div>div>span]:text-body2 [&>div>div>div>span]:text-primary-700',
            '[&>div>div>p]:text-body3 [&>div>div>p]:text-text-30',
            '[&>div>div]:text-body3 [&>div>div]:text-text-30',
          ])}
          Preview={CustomChannelPreview}
        />
        <Show when={props.channel.data?.last_message_at}>
          <p className={classcat(['absolute right-6 top-3 text-body3 text-text-30'])}>
            {dayjs(props.channel.data?.last_message_at as string).format('dddd')}
          </p>
        </Show>
      </div>
    );
  };

  useEffect(() => {
    if (setActiveChannel) {
      setActiveChannel(undefined);
    }
  }, [search, setActiveChannel]);

  return (
    <ChannelList
      filters={{
        joined: true,
        member_count: {
          $lte: 2,
        },
        ...(search
          ? {
              'member.user.name': {
                $autocomplete: search,
              },
            }
          : {}),
        ...(isRequest
          ? {
              joined: undefined,
              member_count: undefined,
              invite: {
                $eq: 'pending',
              },
            }
          : {}),
        type: {
          $in: ['messaging', refresh],
        },
      }}
      List={CustomList}
      Preview={CustomPreview}
      LoadingErrorIndicator={CustomErrorIndicator}
      LoadingIndicator={CustomLoadingIndicator}
      setActiveChannelOnMount={false}
      allowNewMessagesFromUnfilteredChannels={isRequest}
    />
  );
}

export default CustomChannelList;
