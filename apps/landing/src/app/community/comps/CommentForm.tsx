//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import { EmojiPicker } from 'react-activity-feed';
import { getstreamStore } from '_@landing/stores/getstreamStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import ImageArtIcon from '_@shared/icons/ImageArtIcon';
import SmileFaceIcon from '_@shared/icons/SmileFaceIcon';

const CommentForm = ({
  activityId,
  getComments,
}: {
  activityId: string;
  getComments: () => void;
}) => {
  const { feedClient } = getstreamStore();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const handleComment = async () => {
    if (!inputRef.current) return;

    const content = inputRef.current?.value.trim();

    if (!content) return;

    await feedClient?.reactions.add('comment', activityId, { text: content || '' });

    inputRef.current.value = '';
    getComments();
  };

  return (
    <div className="mt-4 border-t-[1px] border-solid border-[rgb(255,255,255)/0.2] pt-4">
      <p className="mb-2">Comments</p>
      <form className="mb-10">
        <textarea
          ref={inputRef}
          placeholder="Write something.."
          className={classcat([
            'h-16.25 resize-none rounded-lg bg-black/[.7] px-4 py-5',
            'w-full text-text-70 outline-none placeholder:text-text-20',
          ])}
        />
        <div className="mb-6 flex items-start">
          <button className="mr-[15px]">
            <ImageArtIcon className="h-[15px] w-[15px]" />
          </button>
          <button className="relative" type="button">
            <SmileFaceIcon className="h-[15px] w-[15px]" />
            <div className="absolute left-0 top-0 h-[15px] w-[15px]">
              <EmojiPicker
                className="[&>div:last-of-type]:opacity-0"
                onSelect={(emoji) => {
                  if (!inputRef.current) return;
                  if ('native' in emoji) {
                    inputRef.current.value += emoji.native;
                  }
                }}
              />
            </div>
          </button>
        </div>
        <Button className={classcat(['btnsm mr-auto w-max'])} onClick={handleComment}>
          Post
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
