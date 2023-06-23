//THIRD PARTY MODULES
import { ChannelPreviewMessenger, ChannelPreviewUIComponentProps } from 'stream-chat-react';

function CustomChannelPreview({ displayTitle, ...props }: ChannelPreviewUIComponentProps) {
  return <ChannelPreviewMessenger {...props} displayTitle={displayTitle || 'Deleted'} />;
}

export default CustomChannelPreview;
