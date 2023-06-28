//THIRD PARTY MODULES
import classcat from 'classcat';
import {
  Avatar,
  ChannelHeaderProps,
  useChannelPreviewInfo,
  useChannelStateContext,
} from 'stream-chat-react';
//SHARED
import InfoReverseIcon from '_@shared/icons/InfoReverseIcon';
import ChevronLeftIcon from '_@shared/icons/ChevronLeftIcon';
//RELATIVE MODULES
import { useModalContext } from '../context/ModalProvider';
import ConversationInfoModal from './modal/ConversationInfoModal';

type CustomHeaderProps = {
  onShowChannel: () => void;
} & ChannelHeaderProps;

function CustomHeader(props: CustomHeaderProps) {
  const { title, onShowChannel } = props;

  const { setOpenInfo } = useModalContext();
  const { channel } = useChannelStateContext();

  const { displayImage, displayTitle } = useChannelPreviewInfo({
    channel,
  });

  return (
    <div className="flex items-center justify-between border-b border-solid border-text-10 p-4 md:px-8">
      <div className="flex items-center justify-start space-x-2">
        <button className={classcat(['block md:hidden'])} onClick={onShowChannel}>
          <ChevronLeftIcon />
        </button>
        <Avatar size={40} image={displayImage} name={displayTitle || 'Deleted'} />
        <p className={classcat(['text-body2 text-primary-700'])}>
          {title || displayTitle ? `@${displayTitle}` : 'Deleted'}
        </p>
      </div>
      <button onClick={() => setOpenInfo(true)}>
        <InfoReverseIcon className={classcat(['h-5 w-5 text-text-70'])} />
      </button>
      <ConversationInfoModal />
    </div>
  );
}

export default CustomHeader;
