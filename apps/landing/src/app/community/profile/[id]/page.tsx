'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { useEffect, useState } from 'react';
import { api, nextApi } from '_@landing/utils/api';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
//LAYOUT, COMPONENTS
import Switch from '_@shared/components/conditions/Switch';
//SHARED
import MessageIcon from '_@shared/icons/MessageIcon';
import FollowedIcon from '_@shared/icons/FollowedIcon';
import { BareShareIcon } from '_@shared/icons/ShareIcon';
//HOOK
import { useGetFeedUser } from '_@landing/hooks/useGetFeedUser';
//RELATIVE MODULES
import ActivityCard, { ActivityType } from '../../comps/ActivityCard';

export default function ProfilePage() {
  const [isFollow, setIsFollow] = useState(false);
  const [activities, setActivities] = useState<ActivityType[]>([]);

  const { client } = useGetFeedUser();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'post';
  const { id } = useParams();
  const pathname = usePathname();
  const utils = nextApi.useContext();

  const { data: userInfo } = nextApi.getGetstreamUserInfo.useQuery({ targetGetstreamId: id });

  api.communityGetFollowingEachOtherInfo
    .query({
      targetGetstreamId: id,
    })
    .then((data) => setIsFollow(data.following));

  const handleUnfollow = () => {
    api.communityUnfollowUser.mutate({ targetGetstreamId: id }).then((data) => {
      if (data.success) {
        utils.getGetstreamUserInfo.invalidate();
        setIsFollow(false);
      }
    });
  };

  const handleFollow = () => {
    api.communityFollowUser.mutate({ targetGetstreamId: id }).then((data) => {
      if (data.success) {
        utils.getGetstreamUserInfo.invalidate();
        setIsFollow(true);
      }
    });
  };

  const toggleFollow = () => {
    if (isFollow) return handleUnfollow();
    return handleFollow();
  };

  useEffect(() => {
    client
      ?.feed('user', id)
      .get({ enrich: true, limit: 10, offset: 1 })
      .then((res) => setActivities(res.results as ActivityType[]));
  }, [client, id]);

  return (
    <div>
      <section className="relative mb-6.25 rounded-lg bg-secondary-300 lg:mb-6">
        <img
          className="relative z-[1] h-20 w-full object-cover lg:h-23.75"
          src={userInfo?.coverUrl || '/images/profile/cover.jpeg'}
          alt=""
        />
        <img
          className="absolute left-1/2 top-12.5 z-[1] h-15 w-15 -translate-x-1/2 rounded-full object-cover lg:left-6 lg:top-11.25 lg:h-25 lg:w-25 lg:translate-x-0"
          src={userInfo?.avatarUrl || '/images/profile/avatar-default.webp'}
          alt=""
        />
        <div className="px-6 pb-14 pt-11.5 text-center lg:pb-23.25 lg:pl-33.5 lg:pt-4 lg:text-left">
          <div className="mb-2 flex flex-col justify-between lg:mb-0 lg:flex-row">
            <p className="mb-2 text-base font-medium lg:text-xl lg:font-bold">
              @{userInfo?.username}
            </p>
            <div className="flex justify-between lg:justify-center">
              <p className="mr-6 text-sm text-text-30">
                <MessageIcon className="mr-1 inline-block" /> <span>Message</span>
              </p>
              <p className="text-sm text-text-30">
                <BareShareIcon className="mr-1 inline-block" /> <span>Share</span>
              </p>
            </div>
          </div>
          <p className="mb-2 text-sm text-text-30 lg:text-base">{userInfo?.aboutMe}</p>
          <div className="mb-6 flex justify-center lg:justify-start">
            <p className="mr-4 text-sm font-semibold">
              {userInfo?.followerNumber} <span className="text-text-30">Followers</span>
            </p>
            <p className="text-sm font-semibold">
              {userInfo?.followingNumber} <span className="text-text-30">Following</span>
            </p>
          </div>
          {isFollow ? (
            <button
              className="rounded-full border border-solid border-primary px-[14.5px] py-[10.5px] font-bold"
              onClick={toggleFollow}
            >
              <div className="flex">
                <FollowedIcon className="mr-2 inline-block" />
                <span className="text-gradient-pr">Following</span>
              </div>
            </button>
          ) : (
            <button
              className="rounded-full border border-solid border-primary px-8.25 py-[9.5px] font-bold"
              onClick={toggleFollow}
            >
              <span className="text-gradient-pr">Follow</span>
            </button>
          )}
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
      <section>
        <Switch.Root>
          <Switch.Case when={type === 'post'}>
            <div className="grid gap-6">
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
