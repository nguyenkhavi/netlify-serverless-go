//THIRD PARTY MODULES
import classcat from 'classcat';
import { useEffect, useMemo, useRef, useState } from 'react';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import {
  Attachment,
  Avatar,
  MessageText,
  MessageTimestamp,
  useMessageContext,
} from 'stream-chat-react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
//SHARED
import DoubleCheckIcon from '_@shared/icons/DoubleCheckIcon';
//HOOK

const CustomMessage = ({ inviteUserIds }: { inviteUserIds: string[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [sameLine, setSameLine] = useState(true);
  const { message, isMyMessage, readBy } = useMessageContext();
  const { user } = useAuthStore();

  const isMyMsg = useMemo(() => isMyMessage(), [isMyMessage]);
  const readByExcludeInvitedUser = useMemo(
    () =>
      readBy?.filter((item) => {
        return !inviteUserIds.includes(item.id) && user?.profile.getstreamId !== item.id;
      }),
    [inviteUserIds, readBy, user?.profile.getstreamId],
  );

  const hasAttachments = useMemo(() => {
    return message.attachments && message.attachments.length > 0;
  }, [message.attachments]);

  useEffect(() => {
    const calculateSameLine = () => {
      if (!ref || !ref.current) return;
      const elMsg = ref.current.querySelector('.str-chat__message-text > div') as HTMLDivElement;
      if (elMsg) {
        const computedStyle = window.getComputedStyle(elMsg);
        const lineHeight = computedStyle.getPropertyValue('line-height').replace('px', '');
        setSameLine(elMsg.clientHeight <= parseFloat(lineHeight));
      }
    };

    calculateSameLine();

    window.addEventListener('resize', calculateSameLine);
    return () => {
      window.removeEventListener('resize', calculateSameLine);
    };
  }, []);

  return (
    <div
      className={classcat(['flex justify-start pb-4', isMyMsg ? 'flex-row-reverse' : 'flex-row'])}
    >
      <Avatar
        name={message.user?.name || message.user?.username || message.user?.id}
        image={message.user?.image}
        size={32}
      />
      <div
        ref={ref}
        className={classcat([
          'relative w-full rounded-[theme(spacing[2.5])] border border-solid border-text-10 bg-secondary-300 p-2',
          isMyMsg ? 'mr-2' : 'ml-2',
          sameLine ? 'pr-19' : 'pb-7.5',
        ])}
      >
        <MessageText customInnerClass="text-text-80 text-body3" />
        {hasAttachments && message.attachments && <Attachment attachments={message.attachments} />}
        <div
          className={classcat([
            'absolute right-2',
            'flex justify-end space-x-2',
            sameLine ? 'top-2.5' : 'bottom-2',
          ])}
        >
          <MessageTimestamp customClass="text-text-20 text-caption" format="hh:mm a" />
          <Show when={isMyMsg && readByExcludeInvitedUser && readByExcludeInvitedUser.length > 0}>
            <DoubleCheckIcon />
          </Show>
        </div>
      </div>
    </div>
  );
};

export default CustomMessage;
