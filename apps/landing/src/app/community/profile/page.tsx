'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
//LAYOUT, COMPONENTS
import Switch from '_@shared/components/conditions/Switch';
//HOOK
import { useGetFeedUser } from '_@landing/hooks/useGetFeedUser';
//RELATIVE MODULES
import ActivityCard, { ActivityType } from '../comps/ActivityCard';

export default function ProfilePage() {
  const { client } = useGetFeedUser();
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const type = searchParams.get('type') || 'post';
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [followerNumbers, setFollowerNumbers] = useState(0);
  const [followingNumbers, setFollowingNumbers] = useState(0);

  const timelineFeed = useMemo(() => client?.feed('timeline'), [client]);
  const userFeed = useMemo(() => client?.feed('user'), [client]);

  const getPost = useCallback(() => {
    if (!timelineFeed) return;
    timelineFeed
      .get({ limit: 20 })
      .then((response) => {
        setActivities(response.results as ActivityType[]);
      })
      .catch((err) => {
        console.log('Failed to get feed', err);
      });
  }, [timelineFeed]);
  const getLikes = useCallback(() => {
    console.log('Get likes');
  }, []);
  const getCollection = useCallback(() => {
    console.log('Get collection');
  }, []);

  const getFollowers = useCallback(async () => {
    const result = await userFeed?.followers();
    setFollowerNumbers(result?.results.length || 0);
  }, [userFeed]);
  const getFollowings = useCallback(async () => {
    const result = await userFeed?.following();
    setFollowingNumbers(result?.results.length || 0);
  }, [userFeed]);

  useEffect(() => {
    if (type === 'post') getPost();
    if (type === 'likes') getLikes();
    if (type === 'collection') getCollection();
  }, [getCollection, getLikes, getPost, type]);

  useEffect(() => {
    getFollowers();
    getFollowings();
  }, [getFollowers, getFollowings]);

  return (
    <div>
      <section className="relative mb-6.25 rounded-lg bg-secondary-300 lg:mb-6">
        <img
          className="relative z-[1] h-20 w-full object-cover lg:h-23.75"
          src={user?.profile.coverUrl || '/images/profile/cover.jpeg'}
          alt=""
        />
        <img
          className="absolute left-1/2 top-12.5 z-[1] h-15 w-15 -translate-x-1/2 rounded-full object-cover lg:left-6 lg:top-11.25 lg:h-25 lg:w-25 lg:translate-x-0"
          src={user?.profile.avatarUrl || '/images/profile/avatar-default.webp'}
          alt=""
        />
        <div className="px-6 pb-14 pt-11.5 text-center lg:pb-23.25 lg:pl-33.5 lg:pt-4 lg:text-left">
          <p className="mb-2 text-base font-medium lg:text-xl lg:font-bold">
            @{user?.profile.username}
          </p>
          <p className="mb-2 text-sm text-text-30 lg:text-base">{user?.profile.description}</p>
          <div className="flex justify-center lg:justify-start">
            <p className="mr-4 text-sm font-semibold">
              {followerNumbers} <span className="text-text-30">Followers</span>
            </p>
            <p className="text-sm font-semibold">
              {followingNumbers} <span className="text-text-30">Following</span>
            </p>
          </div>
        </div>
      </section>
      <div className="mb-6.25 flex rounded-lg bg-secondary-300 p-2 lg:mb-6 lg:px-6 lg:py-3">
        {TABS.map((t, i) => (
          <Link
            key={i}
            href={{
              pathname,
              query: { ...Object.fromEntries(searchParams), type: t.key },
            }}
            className={classcat([
              'block w-23 pt-0.25 text-center text-sm text-text-50 lg:w-33 lg:pb-2.75 lg:pt-3 lg:text-xl',
              t.key === type ? 'text-gradient-pr font-bold' : '',
            ])}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <section className="rounded-lg bg-secondary-300 p-4 lg:p-6">
        <Switch.Root>
          <Switch.Case when={type === 'post'}>
            <div>
              {activities?.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </Switch.Case>
          <Switch.Case when={type === 'likes'}>
            <div>Likes content</div>
          </Switch.Case>
          <Switch.Case when={type === 'collection'}>
            <div>Collection content</div>
          </Switch.Case>
        </Switch.Root>
      </section>
    </div>
  );
}

const TABS = [
  {
    label: 'Post',
    key: 'post',
  },
  {
    label: 'Likes',
    key: 'likes',
  },
  {
    label: 'Collection',
    key: 'collection',
  },
];
