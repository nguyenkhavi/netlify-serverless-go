//THIRD PARTY MODULES
import classcat from 'classcat';
import { useChatContext } from 'stream-chat-react';
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

function BlockModal() {
  const { openBlock, setOpenBlock } = useModalContext();
  const { channel } = useChatContext();

  const onClose = () => {
    setOpenBlock(false);
  };

  return (
    <Modal.Root open={openBlock}>
      <Modal.Overlay className="fixed inset-0 z-toast bg-secondary-200 opacity-60" />
      <Modal.Content
        className={classcat([
          'rounded-lg border border-solid border-text-30 bg-secondary will-change-[transform,opacity]',
          'w-90',
          'fixed left-1/2 top-1/2 z-toast -translate-x-1/2 -translate-y-1/2',
        ])}
      >
        <div className="grid justify-items-center gap-10 p-6">
          <p className={classcat(['text-body2 text-primary-700'])}>
            Block {(channel?.data?.created_by as any).name} will no longer be able to follow or
            message you, and you will not see notifications from{' '}
            {(channel?.data?.created_by as any).name}
          </p>
          <div className={classcat(['grid w-full gap-4'])}>
            <Button className={classcat([classBtnError, 'btnmd'])} variant="outlined">
              Yes
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

export default BlockModal;
