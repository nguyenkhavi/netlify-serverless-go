//THIRD PARTY MODULES
import classcat from 'classcat';
import { EnrichedReaction } from 'getstream';
import { Avatar } from 'react-activity-feed';
import React, { useEffect, useState } from 'react';
import { getstreamStore, StreamType } from '_@landing/stores/getstreamStore';
//SHARED
import HeartIcon, { HeartActiveIcon } from '_@shared/icons/HeartIcon';
//RELATIVE MODULES
import { DEFAULT_AVATAR } from '../constants/constants';

const UserComment = ({ comment }: { comment: EnrichedReaction<StreamType> }) => {
  const { feedClient } = getstreamStore((state) => state);
  const { user } = comment;
  const [updating, setUpdating] = useState(false);
  const [selfLikeId, setSelfLikeId] = useState('');
  const [likeNumber, setLikeNumber] = useState(0);

  useEffect(() => {
    setLikeNumber(comment?.children_counts.like || 0);
  }, [comment?.children_counts.like]);

  useEffect(() => {
    setSelfLikeId(
      comment.latest_children.like?.find((l) => l.user_id === feedClient?.userId)?.id || '',
    );
  }, [feedClient?.userId, comment.latest_children.like]);

  const handleToggleLikeComment = () => {
    if (updating) return;
    setUpdating(true);

    if (!selfLikeId) {
      handleLikeComment();
      return;
    }

    handleUnLikeComment();
  };

  const handleLikeComment = () => {
    feedClient?.reactions
      .addChild('like', comment.id)
      .then((data) => {
        setSelfLikeId(data.id);
        setUpdating(false);
        setLikeNumber((current) => current + 1);
      })
      .catch(() => {
        setUpdating(false);
      });
  };

  const handleUnLikeComment = () => {
    feedClient?.reactions
      .delete(selfLikeId)
      .then(() => {
        setSelfLikeId('');
        setUpdating(false);
        setLikeNumber((current) => current - 1);
      })
      .catch(() => {
        setUpdating(false);
      });
  };

  return (
    <div className="[&:not(:last-of-type)]:mb-[25px]">
      <div className="flex justify-start [&>*:not(:last-child)]:mr-2">
        <Avatar image={user?.data.avatar ? user.data.avatar : DEFAULT_AVATAR} size={40} circle />
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
            <button className="flex items-center" onClick={handleToggleLikeComment}>
              {selfLikeId ? (
                <HeartActiveIcon className="mr-[7px] drop-shadow-btn" />
              ) : (
                <HeartIcon className="mr-[7px] drop-shadow-btn" />
              )}
              <p
                className={classcat([
                  selfLikeId
                    ? 'bg-main-gradient bg-clip-text text-transparent drop-shadow-btn'
                    : '',
                ])}
              >
                {likeNumber}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
