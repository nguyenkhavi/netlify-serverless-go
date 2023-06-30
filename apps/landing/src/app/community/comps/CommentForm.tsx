//THIRD PARTY MODULES
import classcat from 'classcat';
import React, { useState } from 'react';
import { EmojiPicker } from 'react-activity-feed';
import { File } from '_@landing/stores/getstreamStore';
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
  const [images, setImages] = useState<File[]>([]);

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const imgUrl = await feedClient?.images.upload(file);
    if (!imgUrl) return;

    setImages((prev) => [...prev, { url: imgUrl?.file, alt: file.name }]);
  };

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
          <div className="relative mr-3.75 w-[15px]">
            <input
              type="file"
              multiple
              onChange={handleUploadImages}
              className="absolute top-0 z-[1] h-[15px] w-[15px] opacity-0"
            />
            <ImageArtIcon className="absolute top-0 h-[15px] w-[15px]" />
          </div>
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
