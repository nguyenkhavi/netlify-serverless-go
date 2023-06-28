//THIRD PARTY MODULES
import { ChannelPreviewMessenger, ChannelPreviewUIComponentProps } from 'stream-chat-react';

function CustomChannelPreview({ displayTitle, ...props }: ChannelPreviewUIComponentProps) {
  return (
    <ChannelPreviewMessenger
      {...props}
      displayTitle={displayTitle ? `${displayTitle.slice(0, 1)} @${displayTitle}` : 'D Deleted'}
    />
  );
}

export default CustomChannelPreview;
