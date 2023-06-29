'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import 'react-activity-feed/dist/index.css';
import { nextApi } from '_@landing/utils/api';
import * as Popover from '@radix-ui/react-popover';
import urlWithIpfs from '_@landing/utils/urlWithIpfs';
import { Avatar, EmojiPicker } from 'react-activity-feed';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
//SHARED
import CloseIcon from '_@shared/icons/CloseIcon';
import ImageArtIcon from '_@shared/icons/ImageArtIcon';
import SmileFaceIcon from '_@shared/icons/SmileFaceIcon';
import GlobalIcon, { GlobalActiveIcon } from '_@shared/icons/GlobalIcon';
import FollowersIcon, { FollowersActiveIcon } from '_@shared/icons/FollowersIcon';
import { ChevronDownFillIcon, ChevronFillGradientIcon } from '_@shared/icons/ChevronDownIcon';
//HOOK
import { useGetFeedUser } from '_@landing/hooks/useGetFeedUser';
//RELATIVE MODULES
import MainRight from './comps/MainRight';
import HomeAdvHorizontal from '../comps/HomeAdvHorizontal';
import ActivityCard, { ActivityType } from './comps/ActivityCard';

export default function CommunityPage() {
  const { client } = useGetFeedUser();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoverDropdown, setHoverDropdown] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
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
        // to: isPublic ? [] : [],//change later
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
        {isCreatingPost ? (
          <div className="relative rounded-[10px] border border-solid border-text-30 p-6">
            <CloseIcon
              onClick={() => setIsCreatingPost(false)}
              className="absolute right-4 top-6 cursor-pointer"
            />
            <div className="flex">
              <Avatar
                image={
                  urlWithIpfs(client?.currentUser?.data?.avatar) ||
                  'https://getstream.imgix.net/images/random_svg/A.png'
                }
                size={40}
                circle
                className="mr-2"
              />

              <Popover.Root open={open}>
                <Popover.Trigger
                  asChild
                  onMouseOver={() => setHoverDropdown(true)}
                  onMouseOut={() => setHoverDropdown(false)}
                >
                  <div
                    className="group cursor-pointer rounded-[5px] border border-solid border-text-20 px-3.25 py-2"
                    onClick={() => setOpen(true)}
                  >
                    <Show when={!hoverDropdown}>
                      {isPublic ? (
                        <GlobalIcon className="mr-0.5 inline-block" />
                      ) : (
                        <FollowersIcon className="mr-0.5 inline-block" />
                      )}
                    </Show>
                    <Show when={hoverDropdown}>
                      {isPublic ? (
                        <GlobalActiveIcon className="mr-0.5 inline-block" />
                      ) : (
                        <FollowersActiveIcon className="mr-0.5 inline-block" />
                      )}
                    </Show>
                    <span className="mr-0.5 text-sm text-text-70 group-hover:text-gradient-pr">
                      {isPublic ? 'Public' : 'My followers'}
                    </span>
                    {hoverDropdown ? (
                      <ChevronFillGradientIcon className="inline-block" />
                    ) : (
                      <ChevronDownFillIcon className="inline-block" />
                    )}
                  </div>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    align="start"
                    className={classcat([
                      'relative border border-solid border-text-20 bg-secondary will-change-[transform,opacity]',
                      'top-13 w-35 rounded-[4px] p-2',
                    ])}
                    sideOffset={-56}
                    onPointerDownOutside={() => {
                      setOpen(false);
                    }}
                  >
                    <div>
                      <p
                        className="cursor-pointer p-2 text-sm text-text-70"
                        onClick={() => {
                          setOpen(false);
                          setIsPublic(true);
                        }}
                      >
                        <GlobalIcon className="mr-2 inline-block" />
                        Public
                      </p>
                      <p
                        className="cursor-pointer p-2 text-sm text-text-70"
                        onClick={() => {
                          setOpen(false);
                          setIsPublic(false);
                        }}
                      >
                        <FollowersIcon className="mr-2 inline-block" />
                        My followers
                      </p>
                    </div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>
            <div className="">
              <form>
                <textarea
                  ref={inputRef}
                  placeholder="Share your thoughts..."
                  className={classcat([
                    'h-16.25 resize-none rounded-lg bg-black/[.7] px-4 py-5',
                    'w-full text-text-70 outline-none placeholder:text-text-20',
                  ])}
                  onClick={() => setIsCreatingPost(true)}
                />
              </form>
              <div className="mt-2.5 flex items-center border-t-[1px] border-solid border-text-30 pt-4">
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
        ) : (
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
                  onClick={() => setIsCreatingPost(true)}
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
        )}
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
