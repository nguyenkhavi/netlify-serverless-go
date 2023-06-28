//THIRD PARTY MODULES
import classcat from 'classcat';
import {
  ChatAutoComplete,
  EmojiPicker,
  QuotedMessagePreview,
  QuotedMessagePreviewHeader,
  useChannelStateContext,
  useMessageInputContext,
} from 'stream-chat-react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
//SHARED
import EmojiIcon2 from '_@shared/icons/EmojiIcon2';
//HOOK

const CustomMessageInput = () => {
  const { emojiPickerIsOpen, handleSubmit, closeEmojiPicker, openEmojiPicker } =
    useMessageInputContext();
  const { quotedMessage } = useChannelStateContext();

  return (
    <div
      className={classcat([
        'grid grid-flow-row gap-3 border-t border-solid border-text-10 px-4 py-2 md:px-8',
      ])}
    >
      <Show when={quotedMessage}>
        <div className={classcat(['relative grid grid-flow-row justify-center gap-1'])}>
          <QuotedMessagePreviewHeader />
          {quotedMessage && <QuotedMessagePreview quotedMessage={quotedMessage} />}
        </div>
      </Show>
      <div
        className={classcat([
          'grid grid-flow-col grid-cols-[1fr_theme(spacing[22.5])] gap-4 rounded-[theme(spacing[2.5])] bg-black/70 p-2',
        ])}
      >
        <div
          className={classcat([
            'grid grid-flow-col grid-cols-[theme(spacing[6])_1fr] items-center gap-2',
          ])}
        >
          <button
            className={classcat(['relative'])}
            onClick={emojiPickerIsOpen ? closeEmojiPicker : openEmojiPicker}
          >
            <EmojiIcon2 className="text-text-20" />
            <EmojiPicker />
          </button>
          <ChatAutoComplete placeholder="Reply" />
        </div>
        <Button
          className={classcat(['ow:max-w-[90px] ow:rounded-[theme(spacing[2])]'])}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default CustomMessageInput;
