//THIRD PARTY MODULES
import { useRef } from 'react';
import classcat from 'classcat';
import {
  AttachmentPreviewList,
  Avatar,
  ChatAutoComplete,
  EmojiPicker,
  QuotedMessagePreview,
  QuotedMessagePreviewHeader,
  useChannelStateContext,
  useChatContext,
  useMessageInputContext,
} from 'stream-chat-react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
//SHARED
import EmojiIcon from '_@shared/icons/EmojiIcon';
import ImageArtIcon from '_@shared/icons/ImageArtIcon';
//HOOK
import useWindowSize from '_@landing/hooks/useWindowSize';

export const CustomMessageInput = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { emojiPickerIsOpen, uploadNewFiles, handleSubmit, closeEmojiPicker, openEmojiPicker } =
    useMessageInputContext();
  const { quotedMessage, multipleUploads } = useChannelStateContext();
  const { client } = useChatContext();
  const user = client.user;

  const { width } = useWindowSize();

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event: any) => {
    const files = event.target.files;
    uploadNewFiles(files);
  };

  return (
    <div
      id="input-message"
      className={classcat([
        'grid grid-flow-row border-y border-solid border-text-10 p-4',
        'md:p-6 md:pt-3',
      ])}
    >
      <Show when={quotedMessage}>
        <div className={classcat(['relative grid grid-flow-row justify-center gap-1'])}>
          <QuotedMessagePreviewHeader />
          {quotedMessage && <QuotedMessagePreview quotedMessage={quotedMessage} />}
        </div>
      </Show>
      <AttachmentPreviewList />
      <div
        className={classcat([
          'grid grid-cols-[theme(spacing[6.5])_1fr_theme(spacing[29.25])] items-center gap-2 md:grid-cols-[theme(spacing[10.5])_1fr_theme(spacing[29.25])] md:gap-2',
        ])}
      >
        <div className="h-6.5 w-6.5 rounded-full border border-solid border-primary-700 md:h-10.5 md:w-10.5">
          <Avatar name={user?.name || user?.id} image={user?.image} size={width < 768 ? 24 : 40} />
        </div>
        <div className={classcat(['relative'])}>
          <ChatAutoComplete placeholder="Say something/ join conversation" />
          <div
            className={classcat([
              'absolute right-2 top-1/2 grid -translate-y-1/2 grid-flow-col justify-start gap-1 md:right-4 md:gap-4',
            ])}
          >
            <button onClick={handleFileUpload}>
              <ImageArtIcon />
            </button>
            <button
              className={classcat(['relative'])}
              onClick={emojiPickerIsOpen ? closeEmojiPicker : openEmojiPicker}
            >
              <EmojiIcon />
              <EmojiPicker />
            </button>
          </div>
        </div>
        <Button
          className={classcat([
            'max-h-8 ow:max-w-[117px] ow:rounded-[theme(spacing[7.5])] md:max-h-10',
          ])}
          onClick={handleSubmit}
        >
          Add Comment
        </Button>
      </div>
      <input
        type="file"
        multiple={multipleUploads}
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInputChange}
      />
    </div>
  );
};
