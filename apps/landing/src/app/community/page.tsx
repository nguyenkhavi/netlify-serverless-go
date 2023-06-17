'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import 'react-activity-feed/dist/index.css';
import { Avatar } from 'react-activity-feed';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import ImageArtIcon from '_@shared/icons/ImageArtIcon';
import SmileFaceIcon from '_@shared/icons/SmileFaceIcon';
//HOOK
import { useGetFeedUser } from '_@landing/hooks/useGetFeedUser';
//RELATIVE MODULES
import ActivityCard, { ActivityType } from './comps/ActivityCard';

export default function CommunityPage() {
  const { user } = useAuthStore();
  const { client } = useGetFeedUser();

  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [activities, setActivities] = useState<ActivityType[]>([]);

  const timelineUser = useMemo(() => client?.feed('timeline'), [client]);

  const _handleCreatePost = async () => {
    if (!timelineUser || !timelineUser?.userId || !client?.currentUser) return;

    timelineUser
      .addActivity({
        actor: client?.currentUser,
        verb: 'tweet',
        object: inputRef.current?.value || '',
      })
      .then((response) => {
        console.log('success', response);
        if (activities.length) {
          _getData();
        } else {
          setActivities((prev) => [{ ...response, actor: prev[0].actor }, ...prev]);
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  const _updateUserInfo = useCallback(async () => {
    if (!client || !client.userId || !user) return;
    const userGetstreamInfo = await client.user(client.userId).getOrCreate({
      username: user.profile.username,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      gender: user.profile.gender,
    });

    if (userGetstreamInfo && !userGetstreamInfo.data?.['username']) {
      client.user(client.userId).update({
        username: user.profile.username,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        gender: user.profile.gender,
      });
    }
  }, [client, user]);

  const _getData = useCallback(() => {
    if (!timelineUser) return;
    timelineUser
      .get({ limit: 20 })
      .then((response) => {
        setActivities(response.results as ActivityType[]);
      })
      .catch((err) => {
        console.log('Failed to get feed', err);
      });
  }, [timelineUser]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  useEffect(() => {
    _updateUserInfo();
  }, [_updateUserInfo]);

  if (!client) return null;

  return (
    <div>
      <div className="flex rounded-[10px] bg-secondary-200 p-6">
        <Avatar image="https://getstream.imgix.net/images/random_svg/A.png" size={46} circle />
        <div className="ml-2 grow">
          <form>
            <textarea
              ref={inputRef}
              placeholder="Share your thoughts..."
              className={classcat([
                'h-16.25 resize-none rounded-lg bg-black/[.7] px-4 py-5',
                'w-full text-text-70 outline-none placeholder:text-text-20',
              ])}
            />
          </form>
          <div className="mt-2.5 flex">
            <div className="flex items-start">
              <button className="mr-[15px]">
                <ImageArtIcon className="h-[15px] w-[15px]" />
              </button>
              <button>
                <SmileFaceIcon className="h-[15px] w-[15px]" />
              </button>
            </div>
            <Button className={classcat(['btnsm ml-auto w-max'])} onClick={_handleCreatePost}>
              Post
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-6">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
