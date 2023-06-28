//THIRD PARTY MODULES
import urlWithIpfs from '_@landing/utils/urlWithIpfs';
import { ChannelPreviewMessenger, ChannelPreviewUIComponentProps } from 'stream-chat-react';

function CustomChannelPreview({
  displayTitle,
  displayImage,
  ...props
}: ChannelPreviewUIComponentProps) {
  return (
    <ChannelPreviewMessenger
      {...props}
      displayImage={urlWithIpfs(displayImage)}
      displayTitle={displayTitle ? `${displayTitle.slice(0, 1)} @${displayTitle}` : 'D Deleted'}
    />
  );
}

export default CustomChannelPreview;
