//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import { shouldDeleteChannel } from '_@landing/utils/roomChat1vs1';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import { Modal } from '_@shared/components/dialog/Modal';
//RELATIVE MODULES
import { useModalContext } from '../../context/ModalProvider';

const classBtnError = classcat([
  'bg-error ow:rounded-[theme(spacing[7.5])] ow:border-transparent ow:text-primary-700',
  'ow:hover:border-transparent ow:hover:bg-error ow:hover:text-primary-700',
  'ow:hover:drop-shadow-btn',
  'ow:disabled:hover:drop-shadow-none',
  'ow:disabled:border-transparent ow:disabled:bg-error ow:disabled:bg-btn ow:disabled:text-text-30',
]);

function DeleteModal() {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { openLeave, setOpenLeave, setOpenInfo } = useModalContext();
  const { channel, setActiveChannel } = useChatContext();
  const { user } = useAuthStore();

  const onClose = () => {
    setOpenLeave(false);
  };

  const removeUserFromChannel = (userId: string) => {
    setIsDeleting(true);
    channel
      ?.removeMembers([userId])
      .then(() => {
        setOpenInfo(false);
        setActiveChannel(undefined);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setOpenLeave(false);
        setIsDeleting(false);
      });
  };

  const deleteChannel = () => {
    setIsDeleting(true);
    channel
      ?.delete()
      .then(() => {
        setOpenInfo(false);
        setActiveChannel(undefined);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setOpenLeave(false);
        setIsDeleting(false);
      });
  };

  const onDelete = async () => {
    if (!user?.profile.getstreamId || !channel) return;
    const shouldDelete = await shouldDeleteChannel(channel);
    if (shouldDelete) deleteChannel();
    else removeUserFromChannel(user.profile.getstreamId);
  };

  return (
    <Modal.Root open={openLeave}>
      <Modal.Overlay className="fixed inset-0 z-toast bg-secondary-200 opacity-60" />
      <Modal.Content
        className={classcat([
          'rounded-lg border border-solid border-text-30 bg-secondary will-change-[transform,opacity]',
          'w-90',
          'fixed left-1/2 top-1/2 z-toast -translate-x-1/2 -translate-y-1/2',
        ])}
      >
        <div className="grid justify-items-center gap-10 p-6">
          <div className={classcat(['grid justify-items-center gap-2'])}>
            <p className={classcat(['text-h6 text-primary-700'])}>Delete conversation?</p>
            <p className={classcat(['text-body1 text-text-30'])}>
              This can’t be undone and the conversation history will be deleted from your inbox
            </p>
          </div>
          <div className={classcat(['grid w-full gap-4'])}>
            <Button
              isLoading={isDeleting}
              onClick={onDelete}
              className={classcat([classBtnError, 'btnmd'])}
              variant="outlined"
            >
              Delete
            </Button>
            <Button
              onClick={onClose}
              className={classcat(['ow:rounded-[theme(spacing.10)]', 'btnmd'])}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}

export default DeleteModal;
