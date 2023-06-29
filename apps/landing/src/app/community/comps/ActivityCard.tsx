//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { Avatar } from 'react-activity-feed';
import { EnrichedReaction } from 'getstream';
import urlWithIpfs from '_@landing/utils/urlWithIpfs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getstreamStore, FlatActivityEnrichedType } from '_@landing/stores/getstreamStore';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
//SHARED
import RetweetIcon from '_@shared/icons/RetweetIcon';
import { BareShareIcon } from '_@shared/icons/ShareIcon';
import HeartIcon, { HeartActiveIcon } from '_@shared/icons/HeartIcon';
import CommentIcon, { CommentActiveIcon } from '_@shared/icons/CommentIcon';
//RELATIVE MODULES
import CommentForm from './CommentForm';
import UserComment from './UserComment';
import { DEFAULT_AVATAR } from '../constants/constants';

type ActivityProps = {
  activity: FlatActivityEnrichedType;
};
export default function ActivityCard({ activity }: ActivityProps) {
  const { feedClient } = getstreamStore();
  const clientId = feedClient?.userId;
  const { actor } = activity;
  const [openComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState<EnrichedReaction[]>();
  const [likeNumber, setLikeNumber] = useState(0);
  const [updating, setUpdating] = useState(false);
  const [selfLikeId, setSelfLikeId] = useState('');

  useEffect(() => {
    setLikeNumber(activity?.reaction_counts?.like || 0);
  }, [activity?.reaction_counts?.like]);

  const avatarUrl = useMemo(() => {
    if (typeof actor === 'string') return '';
    return actor?.data.avatar ? actor.data.avatar : DEFAULT_AVATAR;
  }, [actor]);

  const getSelfLikeId = useCallback(async () => {
    if (!feedClient) return '';
    const { results } = await feedClient.reactions.filter({
      activity_id: activity.id,
      kind: 'like',
      filter_user_id: feedClient.userId,
      limit: 1,
    });

    if (results.length) return setSelfLikeId(results[0].id);
    return setSelfLikeId('');
  }, [activity.id, feedClient]);

  useEffect(() => {
    getSelfLikeId();
  }, [getSelfLikeId]);

  const getComments = useCallback(async () => {
    const reactions = await feedClient?.reactions.filter({
      activity_id: activity.id,
      kind: 'comment',
      limit: 10,
    });
    setComments(reactions?.results as EnrichedReaction[]);
  }, [activity.id, feedClient?.reactions]);

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

  const handleToggleLikeActivity = async () => {
    if (updating) return;
    setUpdating(true);

    if (selfLikeId) {
      handleUnlikeActivity();
      return;
    }
    handleLikeActivity();
  };

  const handleLikeActivity = () => {
    feedClient?.reactions.add('like', activity.id).then((data) => {
      setUpdating(false);
      setSelfLikeId(data.id);
      setLikeNumber(likeNumber + 1);
    });
  };

  const handleUnlikeActivity = () => {
    feedClient?.reactions.delete(selfLikeId).then(() => {
      setUpdating(false);
      setSelfLikeId('');
      setLikeNumber(likeNumber - 1);
    });
  };

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <div className={classcat(['rounded-[10px] bg-secondary-200 p-6'])}>
      <div className="grid grid-flow-col justify-start gap-2.5">
        <Avatar image={urlWithIpfs(avatarUrl)} size={40} circle />

        <div>
          <Link
            prefetch={false}
            href={
              typeof activity?.actor === 'string'
                ? '/community'
                : clientId === activity.actor?.id
                ? '/community/profile'
                : `/community/profile/${activity.actor?.id}`
            }
            className="block text-h6"
          >
            @
            {typeof activity?.actor === 'string'
              ? activity?.actor
              : activity?.actor?.data?.username}
          </Link>
          <span className="text-body3 text-[#666666]">
            {activity?.time && new Date(activity?.time).toLocaleDateString('en-US')}
          </span>
        </div>
      </div>
      <div className="mb-3 mt-6 whitespace-pre-line text-sm text-text-70">{_contentRender()}</div>
      <div className="flex [&>*:not(:last-child)]:mr-8">
        <button className="flex items-center" onClick={handleToggleLikeActivity}>
          {selfLikeId ? (
            <HeartActiveIcon className="mr-[7px] drop-shadow-btn" />
          ) : (
            <HeartIcon className="mr-[7px] drop-shadow-btn" />
          )}
          <p
            className={classcat([
              selfLikeId
                ? 'bg-main-gradient bg-clip-text text-transparent drop-shadow-btn'
                : 'text-text-50',
            ])}
          >
            {likeNumber}
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
              openComment
                ? 'bg-main-gradient bg-clip-text text-transparent drop-shadow-btn'
                : 'text-text-50',
            ])}
          >
            {comments?.length || 0}
          </p>
        </button>
        <button>
          <RetweetIcon />
        </button>
        <button>
          <BareShareIcon />
        </button>
      </div>

      <div>
        <Show when={openComment}>
          <CommentForm activityId={activity.id} getComments={getComments} />
          {comments?.map((comment: any) => (
            <UserComment key={comment.id} comment={comment} />
          ))}
        </Show>
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
