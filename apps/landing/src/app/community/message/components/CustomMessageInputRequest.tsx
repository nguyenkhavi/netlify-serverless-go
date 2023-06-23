//THIRD PARTY MODULES
import classcat from 'classcat';
import { useChatContext } from 'stream-chat-react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//RELATIVE MODULES
import { useModalContext } from '../context/ModalProvider';
//RELATIVE MODULES

const classBtnError = classcat([
  'ow:rounded-[theme(spacing[7.5])] ow:border-error ow:text-error',
  'ow:hover:border-error ow:hover:bg-error',
  'ow:hover:drop-shadow-btn',
  'ow:disabled:hover:drop-shadow-none',
  'ow:disabled:border-transparent ow:disabled:bg-error ow:disabled:bg-btn ow:disabled:text-text-30',
]);

function CustomMessageInputRequest({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) {
  const { channel, setActiveChannel } = useChatContext();
  const { setOpenReport } = useModalContext();

  const _onAccept = async () => {
    await channel?.acceptInvite();
    setActiveChannel(channel);
    onAccept();
  };

  const _onDelete = async () => {
    await channel?.rejectInvite();
    setActiveChannel(undefined);
    onReject();
  };

  const onReport = () => {
    setOpenReport(true);
  };

  return (
    <div
      className={classcat([
        'grid grid-flow-row gap-4 border-t border-solid border-text-10 p-4 md:px-8',
      ])}
    >
      <p className={classcat(['text-body3 text-text-50'])}>
        Do you want to join this chat? The sender would not know you’ve seen their request until you
        accept.
      </p>
      <Button
        onClick={_onAccept}
        variant="outlined"
        className={classcat(['ow:rounded-[theme(spacing[7.5])]'])}
      >
        Accept
      </Button>
      <div className={classcat(['grid grid-flow-col gap-4'])}>
        <Button onClick={onReport} className={classBtnError} variant="outlined">
          Report
        </Button>
        <Button onClick={_onDelete} className={classBtnError} variant="outlined">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default CustomMessageInputRequest;
