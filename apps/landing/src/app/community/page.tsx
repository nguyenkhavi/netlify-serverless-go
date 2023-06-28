'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import 'react-activity-feed/dist/index.css';
import { nextApi } from '_@landing/utils/api';
import urlWithIpfs from '_@landing/utils/urlWithIpfs';
import { Avatar, EmojiPicker } from 'react-activity-feed';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import ImageArtIcon from '_@shared/icons/ImageArtIcon';
import SmileFaceIcon from '_@shared/icons/SmileFaceIcon';
//HOOK
import { useGetFeedUser } from '_@landing/hooks/useGetFeedUser';
//RELATIVE MODULES
import MainRight from './comps/MainRight';
import HomeAdvHorizontal from '../comps/HomeAdvHorizontal';
import ActivityCard, { ActivityType } from './comps/ActivityCard';

export default function CommunityPage() {
  const { client } = useGetFeedUser();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [activities, setActivities] = useState<ActivityType[]>([]);

  const userFeed = useMemo(() => client?.feed('user'), [client]);
  const userTimeline = useMemo(() => client?.feed('timeline'), [client]);

  const { mutate: createPost } = nextApi.communityCreatePost.useMutation();

  const _handleCreatePost = async () => {
    if (!userFeed || !userFeed?.userId || !client?.currentUser) return;

    userFeed
      .addActivity({
        // @ts-ignore
        actor: client.currentUser,
        verb: 'tweet',
        object: inputRef.current?.value || '',
        content: inputRef.current?.value || '',
        time: new Date().toISOString(),
      })
      .then((response) => {
        console.log('success', response);
        if (inputRef.current) inputRef.current.value = '';
        createPost({ content: response.content, postId: response.id });
        if (activities.length) {
          _getData();
        } else {
          setActivities((prev) => [{ ...response, actor: prev[0]?.actor }, ...prev]);
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  const _getData = useCallback(() => {
    if (!userTimeline) return;

    userTimeline
      .get({ limit: 20 })
      .then((response) => {
        console.log({ response });
        setActivities(response.results as ActivityType[]);
      })
      .catch((err) => {
        console.log('Failed to get feed', err);
      });
  }, [userTimeline]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_17.5rem]">
      <div>
        <div className="flex rounded-[10px] bg-secondary-200 p-6">
          <Avatar
            image={
              urlWithIpfs(client?.currentUser?.data?.avatar) ||
              'https://getstream.imgix.net/images/random_svg/A.png'
            }
            size={40}
            circle
          />

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
                <button className="relative">
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
              <Button className={classcat(['btnsm ml-auto w-max'])} onClick={_handleCreatePost}>
                Post
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-6">
          {activities.slice(0, 2).map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
          <HomeAdvHorizontal />
          {activities.slice(2).map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
      <div className="hidden lg:block">
        <MainRight />
      </div>
    </div>
  );
}
