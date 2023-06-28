//THIRD PARTY MODULES
import classcat from 'classcat';
import { ChannelMemberResponse } from 'stream-chat';
import { useCallback, useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import { DefaultStreamChatGenerics } from 'stream-chat-react/dist/types/types';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import { Modal } from '_@shared/components/dialog/Modal';
import BaseSwitch from '_@shared/components/switch/BaseSwitch';
//SHARED
import ChevronLeftIcon from '_@shared/icons/ChevronLeftIcon';
//RELATIVE MODULES
import './popup.css';
import FollowStatus from '../FollowStatus';
import { useModalContext } from '../../context/ModalProvider';

const classBtnError = classcat([
  'bg-error ow:w-full ow:rounded-[theme(spacing[7.5])]  ow:border-transparent ow:text-primary-700 ow:md:w-63.5',
  'ow:hover:border-transparent ow:hover:bg-error ow:hover:text-primary-700',
  'ow:hover:drop-shadow-btn',
  'ow:disabled:hover:drop-shadow-none',
  'ow:disabled:border-transparent ow:disabled:bg-error ow:disabled:bg-btn ow:disabled:text-text-30',
]);

function ConversationInfoModal() {
  const [members, setMembers] = useState<ChannelMemberResponse<DefaultStreamChatGenerics>[]>([]);
  const [notify, setNotify] = useState(false);
  const { user } = useAuthStore();
  const { channel } = useChatContext();
  const { openInfo, setOpenInfo } = useModalContext();
  const { setOpenBlock, setOpenLeave, setOpenReport, setBlockUser } = useModalContext();

  const onClose = () => {
    setOpenInfo(false);
  };

  const onMute = (value: boolean) => {
    if (!value)
      channel?.mute({
        user_id: user?.profile.getstreamId,
      });
    else
      channel?.unmute({
        user_id: user?.profile.getstreamId,
      });
    setNotify(value);
  };

  const onBlock = () => {
    setOpenBlock(true);
    setBlockUser(members?.[0]);
  };

  const onDelete = () => {
    setOpenLeave(true);
  };

  const onReport = () => {
    setOpenReport(true);
  };

  const _queryMembers = useCallback(() => {
    channel
      ?.queryMembers({})
      .then((rp) => {
        const members = rp.members.filter((item) => item.user_id !== user?.profile.getstreamId);
        setMembers(members);
      })
      .catch((err) => console.log(err));
  }, [channel, user?.profile.getstreamId]);

  const _getNotify = useCallback(() => {
    if (openInfo) {
      setNotify(() => !channel?.muteStatus()?.muted);
    }
  }, [channel, openInfo]);

  useEffect(() => {
    _queryMembers();
  }, [_queryMembers]);

  useEffect(() => {
    _getNotify();
  }, [_getNotify]);

  return (
    <Modal.Root open={openInfo}>
      <Modal.Overlay className="fixed inset-0 z-overlay bg-secondary-200 opacity-60" />
      <Modal.Content
        className={classcat([
          'rounded-lg border border-solid border-text-30 bg-secondary will-change-[transform,opacity]',
          'w-90 md:w-150',
          'fixed left-1/2 top-1/2 z-toast -translate-x-1/2 -translate-y-1/2',
        ])}
      >
        <div className="flex flex-col">
          <div
            className={classcat([
              'grid grid-flow-col items-center justify-between gap-2 border-b border-text-10 p-4 md:p-6',
            ])}
          >
            <div className={classcat(['grid grid-flow-col items-center justify-start gap-2'])}>
              <button onClick={onClose}>
                <ChevronLeftIcon />
              </button>
              <p className={classcat(['text-h6 text-primary-700'])}>Conversation Info</p>
            </div>
          </div>

          <div className={classcat(['grid'])}>
            <Show when={members.length > 0}>
              <div
                className={classcat([
                  'grid gap-6 p-4 md:p-6',
                  'border-b border-solid border-text-10',
                ])}
              >
                {members.map((item) => (
                  <div
                    key={item.user_id}
                    className={classcat(['grid grid-flow-col items-center justify-between gap-4'])}
                  >
                    <div
                      className={classcat(['grid grid-flow-col items-center justify-start gap-2'])}
                    >
                      <Avatar name={item.user?.name} image={item.user?.image} size={40} />
                      <p className={classcat(['text-body2 text-primary-700'])}>{`@${
                        item.user?.name ?? ''
                      }`}</p>
                    </div>
                    <FollowStatus id={item.user_id ?? ''} />
                  </div>
                ))}
              </div>
            </Show>
            <div
              className={classcat([
                'grid grid-flow-col items-start justify-between gap-3 p-4 md:p-6',
                'border-b border-solid border-text-10',
              ])}
            >
              <div className={classcat(['grid justify-start gap-1'])}>
                <p
                  className={classcat([
                    'font-semibold leading-[theme(spacing[4.25])] text-primary-700',
                  ])}
                >
                  Notification
                </p>
                <p className={classcat(['text-body3 text-text-50'])}>
                  Snooze notifications from {members[0]?.user?.name}
                </p>
              </div>
              <BaseSwitch checked={notify} onCheckedChange={onMute} />
            </div>
            <div
              className={classcat([
                'flex flex-col items-center justify-center space-y-6 p-4 md:p-6',
              ])}
            >
              <Show when={false}>
                <button
                  onClick={onBlock}
                  className={classcat(['w-fit text-error hover:drop-shadow-btn'])}
                >
                  Block {members[0]?.user?.name}
                </button>
              </Show>
              <Show when={false}>
                <button
                  onClick={onReport}
                  className={classcat(['w-fit text-error hover:drop-shadow-btn'])}
                >
                  Report {members[0]?.user?.name}
                </button>
              </Show>
              <Button
                onClick={onDelete}
                className={classcat([classBtnError, 'btnmd'])}
                variant="outlined"
              >
                Delete conversation
              </Button>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}

export default ConversationInfoModal;
