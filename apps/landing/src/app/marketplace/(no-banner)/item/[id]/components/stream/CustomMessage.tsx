//THIRD PARTY MODULES
import classcat from 'classcat';
import { useMemo } from 'react';
import {
  Attachment,
  Avatar,
  MessageText,
  MessageTimestamp,
  useChannelActionContext,
  useChatContext,
  useMessageContext,
} from 'stream-chat-react';
//LAYOUT, COMPONENTS
import Switch from '_@shared/components/conditions/Switch';
//SHARED
import ReplyIcon from '_@shared/icons/ReplyIcon';
import LikeColorIcon from '_@shared/icons/LikeColorIcon';
import LikeWhiteIcon from '_@shared/icons/LikeWhiteIcon';
//HOOK
import useWindowSize from '_@landing/hooks/useWindowSize';

const CustomMessage = () => {
  const { width } = useWindowSize();
  const { isReactionEnabled, message, handleReaction } = useMessageContext();
  const { setQuotedMessage } = useChannelActionContext();
  const { client } = useChatContext();
  const user = client.user;

  const hasAttachments = useMemo(() => {
    return message.attachments && message.attachments.length > 0;
  }, [message.attachments]);

  const hasReacted = useMemo(() => {
    return message.own_reactions?.some((reaction) => reaction.user_id === user?.id);
  }, [message.own_reactions, user?.id]);

  const onLike = (e: React.MouseEvent) => {
    handleReaction('like', e);
  };

  const onReply = () => {
    setQuotedMessage(message);
    const inputEl = document.querySelector('#input-message textarea') as HTMLTextAreaElement;
    if (inputEl) {
      inputEl.focus();
    }
  };

  const LikeButton = () => {
    return (
      <div className={classcat(['flex space-x-0.75'])}>
        <button
          disabled={!isReactionEnabled || !!message.deleted_at}
          onClick={onLike}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <Switch.Root>
            <Switch.Case when={hasReacted}>
              <LikeColorIcon className={classcat(['h-5 w-5'])} />
            </Switch.Case>
            <Switch.Case when={!hasReacted}>
              <LikeWhiteIcon className={classcat(['h-5 w-5'])} />
            </Switch.Case>
          </Switch.Root>
        </button>
        <p className={classcat([hasReacted ? 'text-gradient-pr' : 'text-primary-700'])}>
          {message.reaction_counts?.like ?? 0}
        </p>
      </div>
    );
  };

  const ReplyButton = () => {
    return (
      <button className={classcat(['flex space-x-1.25 text-primary-700'])} onClick={onReply}>
        <ReplyIcon className={classcat(['h-5 w-5'])} />
        <p className={classcat(['text-body3 text-primary-700'])}>Reply</p>
      </button>
    );
  };

  return (
    <div
      className={classcat(['flex space-x-2 border-b border-solid border-text-10 p-4', 'md:p-6'])}
    >
      <div className="h-5 w-5 rounded-full border border-solid border-primary-700 md:h-8 md:w-8">
        <Avatar
          name={message.user?.name || message.user?.username || message.user?.id}
          image={message.user?.image}
          size={width < 768 ? 18 : 30}
        />
      </div>

      <div className={classcat(['grid w-full grid-flow-row gap-4'])}>
        <div className={classcat(['grid grid-flow-row gap-2'])}>
          <div className={classcat(['flex items-center space-x-2'])}>
            <p className={classcat(['text-body2 text-primary-700'])}>
              {message.user?.name || message.user?.username || message.user?.id}
            </p>
            <MessageTimestamp customClass="text-text-50 text-body3 " format="ddd" />
          </div>
          <MessageText customInnerClass="text-text-50 text-body1" />
          {hasAttachments && message.attachments && (
            <Attachment attachments={message.attachments} />
          )}
        </div>
        <div className="grid grid-flow-col justify-start gap-7.5">
          <LikeButton />
          <ReplyButton />
        </div>
      </div>
    </div>
  );
};

export default CustomMessage;
