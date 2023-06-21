//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
import React, { useCallback, useEffect } from 'react';
import { Avatar, EmojiPicker } from 'react-activity-feed';
import { EnrichedUser, EnrichedReaction, FlatActivityEnriched } from 'getstream';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
//SHARED
import ShareIcon from '_@shared/icons/ShareIcon';
import RetweetIcon from '_@shared/icons/RetweetIcon';
import ImageArtIcon from '_@shared/icons/ImageArtIcon';
import SmileFaceIcon from '_@shared/icons/SmileFaceIcon';
import HeartIcon, { HeartActiveIcon } from '_@shared/icons/HeartIcon';
import CommentIcon, { CommentActiveIcon } from '_@shared/icons/CommentIcon';
//HOOK
import { StreamType, useGetFeedUser } from '_@landing/hooks/useGetFeedUser';

export type ActivityType = FlatActivityEnriched<StreamType>;

type ActivityProps = {
  activity: ActivityType;
};
export default function ActivityCard({ activity }: ActivityProps) {
  const { client } = useGetFeedUser();
  const clientId = client?.userId;
  const [openComment, setOpenComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false); //get this info from api
  const [likes, setLikes] = useState<EnrichedReaction[]>(); //get this info from api
  const [comments, setComments] = useState<EnrichedReaction[]>();

  const getLikes = useCallback(async () => {
    const reactions = await client?.reactions.filter({ activity_id: activity.id, kind: 'like' });
    setLikes(reactions?.results as EnrichedReaction[]);
    if (reactions?.results.find((r) => r.user_id === clientId)) setIsLiked(true);
  }, [activity.id, client?.reactions, clientId]);

  const getComments = useCallback(async () => {
    const reactions = await client?.reactions.filter({ activity_id: activity.id, kind: 'comment' });
    setComments(reactions?.results as EnrichedReaction[]);
  }, [activity.id, client?.reactions]);

  const _contentRender = () => {
    if (typeof activity?.object !== 'string') return <></>;
    const content = activity?.object
      .split(/\r\n|\r|\n/) // first break on line
      .map((line, i) => (
        <p key={i}>
          {line
            .split(' ') // break for each word
            .map((word, j) => WordRender(word, `item-${i}-${j}`))
            .reduce<any>((acc, elem) => (acc.length ? [acc, ' ', elem] : [elem]), [])}
        </p>
      ))
      .reduce<any>((acc, elem) => (acc.length ? [acc, '\n', elem] : [elem]), []);
    return <>{content}</>;
  };

  const toggleOpenComment = () => setOpenComment((prev) => !prev);

  const handleLikeActivity = async () => {
    try {
      if (!isLiked) {
        await client?.reactions.add('like', activity.id, {});
        setIsLiked(true);
      } else {
        await client?.reactions.delete(likes?.find((r) => r?.user_id === clientId)?.id || '');
        setIsLiked(false);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getLikes();
    getComments();
  }, [getComments, getLikes]);

  return (
    <div className={classcat(['rounded-[10px] bg-secondary-200 p-6'])}>
      <div className="grid grid-flow-col justify-start gap-2.5">
        <Avatar image="https://getstream.imgix.net/images/random_svg/A.png" size={40} circle />
        <div>
          <p className="text-h6">
            @{typeof activity?.actor === 'string' ? activity?.actor : activity?.actor.data.username}
          </p>
          <span className="text-body3 text-[#666666]">
            {activity?.time && new Date(activity?.time).toLocaleDateString('en-US')}
          </span>
        </div>
      </div>
      <div className="mb-3 mt-6 whitespace-pre-line text-sm text-text-70">{_contentRender()}</div>
      <div className="flex [&>*:not(:last-child)]:mr-8">
        <button className="flex items-center" onClick={handleLikeActivity}>
          {isLiked ? (
            <HeartActiveIcon className="mr-[7px] drop-shadow-btn" />
          ) : (
            <HeartIcon className="mr-[7px] drop-shadow-btn" />
          )}
          <p
            className={classcat([
              isLiked ? 'bg-main-gradient bg-clip-text text-transparent drop-shadow-btn' : '',
            ])}
          >
            {likes?.length || 0}
          </p>
        </button>
        <button className="flex items-center" onClick={toggleOpenComment}>
          {openComment ? (
            <CommentActiveIcon className="mr-[7px] drop-shadow-btn" />
          ) : (
            <CommentIcon className="mr-[7px] drop-shadow-btn" />
          )}
          <p
            className={classcat([
              openComment ? 'bg-main-gradient bg-clip-text text-transparent drop-shadow-btn' : '',
            ])}
          >
            {comments?.length || 0}
          </p>
        </button>
        <button>
          <RetweetIcon />
        </button>
        <button>
          <ShareIcon />
        </button>
      </div>

      <div>
        <Show when={openComment}>
          <Comment activityId={activity.id} />
          {comments?.map((comment: any) => (
            <UserComment key={comment.id} comment={comment} />
          ))}
        </Show>
      </div>
    </div>
  );
}

function Comment({ activityId }: { activityId: string }) {
  const { client } = useGetFeedUser();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const handleComment = async () => {
    const content = inputRef.current?.value;
    await client?.reactions.add('comment', activityId, { text: content || '' });

    if (inputRef.current) inputRef.current.value = '';
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
                  const emojiValue = emoji.native;
                  if (inputRef.current) inputRef.current.value += emojiValue;
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
}

function UserComment({ comment }: { comment: EnrichedReaction }) {
  const { client } = useGetFeedUser();
  const [user, setUser] = useState<EnrichedUser>();
  const [isLiked, setIsLiked] = useState(false);

  const getUserInfo = useCallback(async () => {
    const user = await client?.user(comment.user_id).get();
    setUser(user as unknown as EnrichedUser);
  }, [client, comment.user_id]);

  const toggleLikeComment = async () => {
    try {
      if (!isLiked) {
        await client?.reactions.addChild('like', comment.id);
      } else {
        await client?.reactions.delete(
          comment?.latest_children?.like?.find((l) => l.user_id === client?.userId)?.id || '',
        );
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    if (comment?.latest_children?.like?.find((l) => l.user_id === client?.userId)) setIsLiked(true);
  }, [client?.userId, comment?.latest_children?.like]);

  return (
    <div className="[&:not(:last-of-type)]:mb-[25px]">
      <div className="flex justify-start [&>*:not(:last-child)]:mr-2">
        <Avatar image="https://getstream.imgix.net/images/random_svg/A.png" size={40} circle />
        <div className="grow">
          <div className="rounded-lg bg-black/[.7] px-4 py-[7px]">
            <p className="text-sm">
              @{typeof user?.data?.username === 'string' ? user?.data?.username : ''}
            </p>
            <span className="mb-3 text-body3 text-[#666666]">
              {comment?.updated_at && new Date(comment?.updated_at).toLocaleDateString('en-US')}
            </span>
            <p className="text-sm text-text-70">{comment.data.text as string}</p>
          </div>
          <div className="flex [&>*:not(:last-child)]:mr-8">
            <button className="flex items-center" onClick={toggleLikeComment}>
              {isLiked ? (
                <HeartActiveIcon className="mr-[7px] drop-shadow-btn" />
              ) : (
                <HeartIcon className="mr-[7px] drop-shadow-btn" />
              )}
              <p
                className={classcat([
                  isLiked ? 'bg-main-gradient bg-clip-text text-transparent drop-shadow-btn' : '',
                ])}
              >
                {comment.children_counts?.like}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WordRender(word: string, key: string) {
  if (word.startsWith('http') || word.startsWith('www')) {
    return (
      <a
        key={key}
        href={encodeURI(word)}
        className="text-primary"
        target="blank"
        rel="nofollow noreferrer noopener"
      >
        {word}
      </a>
    );
  } else if (word.startsWith('#')) {
    return (
      <a key={key} className="text-primary">
        {word}
      </a>
    );
  }
  return word;
}
