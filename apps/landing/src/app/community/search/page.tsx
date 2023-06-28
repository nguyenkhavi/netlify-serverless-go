'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import dayjs from 'dayjs';
import Link from 'next/link';
import classcat from 'classcat';
import { Avatar } from 'react-activity-feed';
import { DateRange } from 'react-day-picker';
import { useMemo, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import urlWithIpfs from '_@landing/utils/urlWithIpfs';
import { FormProvider, useForm } from 'react-hook-form';
import { api, RouterOutputs } from '_@landing/utils/api';
import { usePathname, useSearchParams } from 'next/navigation';
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import NoData from '_@landing/components/NoData';
import FormItem from '_@shared/components/FormItem';
import SearchInput from '_@shared/components/SearchInput';
import Calendar from '_@shared/components/calendar/Calendar';
import FormRadioGroup from '_@shared/components/radio/FormRadioGroup';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import CalendarIcon from '_@shared/icons/CalendarIcon';
//HOOK
import { useGetFeedUser } from '_@landing/hooks/useGetFeedUser';
//RELATIVE MODULES
import ActivityCard from '../comps/ActivityCard';
import MobileSearchFilter from '../comps/MobileFilter';

export const schema = z.object({
  people: z.string().trim(),
});

export const OPTIONS = [
  { value: 'anyone', label: 'From anyone' },
  { value: 'peopleYouFollow', label: 'People you follow' },
];
export type FormValues = z.infer<typeof schema>;

export default function SearchPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get('type') || 'all';

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { people: 'anyone' },
  });

  const { handleSubmit } = methods;

  const [searchedUsers, setSearchedUsers] = useState<
    RouterOutputs['communitySearchUserOrPost']['users']
  >([]);

  const [searchedPosts, setSearchedPosts] = useState<
    RouterOutputs['communitySearchUserOrPost']['posts']
  >([]);

  const searchText = useRef<HTMLInputElement>(null);
  // const router = useRouter();

  const _handleSearch = () => {
    // router.push(`/community/search?k=${searchText.current?.value}`);
    if (!searchText.current) return;

    // FE use this api to integrate
    api.communitySearchUserOrPost
      .query({
        type: 'ALL',
        keyword: searchText.current.value,
        paging: { page: 1, pageSize: 4 },
        peopleFilter: 'ANYONE',
      })
      .then((data) => {
        console.log({ data });
        if (data?.users?.length) {
          setSearchedUsers(data?.users);
        }

        if (data?.posts?.length) {
          setSearchedPosts(data.posts);
        }
      });
  };

  const onFilter = (values: FormValues) => {
    console.log(values);
    console.log({ date });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_17.5rem]">
      <div>
        <div className="mb-6 flex justify-between">
          <div className="mr-2 flex-1 lg:mr-0">
            <SearchInput
              ref={searchText}
              name="search"
              type="text"
              placeholder="Search"
              className={classcat([
                'h-10 md:text-body1',
                'ow:border-[.5px] ow:border-text-10 ow:bg-secondary-300',
              ])}
              iconPosition="right"
              onKeyDown={(e: KeyboardEvent) => {
                e.key === 'Enter' && _handleSearch();
              }}
              onClickIcon={_handleSearch}
            />
          </div>
          <MobileSearchFilter />
        </div>
        <div className="border-b-[1px] border-solid border-text-10">
          {TAB_MENU.map((tab, idx) => (
            <Link
              key={idx}
              href={{
                pathname,
                query: { ...Object.fromEntries(searchParams), type: tab.key },
              }}
              className={classcat([
                'inline-block w-[92px] pb-[11px] pt-[1px] text-center text-body1 text-text-50 lg:w-[134px] lg:text-body1',
                tab.key === query
                  ? 'relative bg-main-gradient bg-clip-text text-transparent before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-full before:bg-main-gradient'
                  : '',
              ])}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <section className="my-6 bg-secondary-200 p-6">
          <Show when={query !== 'post'}>
            <div>
              {searchedUsers &&
                searchedUsers.map((user) => (
                  <AccountComp
                    key={user.userId}
                    name={user.username}
                    aboutMe={user.aboutMe}
                    avatar={user.avatar}
                    following={user.following}
                    getstreamId={user.getstreamId}
                  />
                ))}
            </div>
          </Show>
          <Show when={searchedUsers && searchedUsers.length > 4}>
            <button className="text-gradient-pr relative left-1/2 -translate-x-1/2 before:absolute before:bottom-0 before:h-[1px] before:w-full before:bg-main-gradient">
              View All
            </button>
          </Show>
          <Show
            when={
              (query === 'account' && searchedUsers?.length === 0) ||
              (query === 'post' && searchedPosts?.length === 0) ||
              (query === 'all' && searchedUsers?.length === 0 && searchedPosts?.length === 0)
            }
          >
            <NoData />
          </Show>
        </section>

        <Show when={query === 'all' || query === 'post'}>
          <HomeAdvHorizontal />
        </Show>
        <Show when={query !== 'post'}>
          <div className="mt-6 grid gap-6">
            {searchedPosts &&
              searchedPosts.map((post) => <ActivityCard key={post.id} activity={post} />)}
          </div>
        </Show>
      </div>

      <div>
        <div className="mb-6 hidden h-fit rounded-[10px] bg-secondary-300 p-4 lg:block">
          <h2 className="mb-4 text-xl">Search Filter</h2>
          <h3 className="mb-1.25 text-base">People</h3>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onFilter)} className="mb-4">
              <FormItem label="" name="people" className="mb-4">
                <FormRadioGroup options={OPTIONS} className="gap-2" />
              </FormItem>

              <div className="mb-4 ml-auto hidden lg:block">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outlined"
                      leadingIcon={<CalendarIcon />}
                      className={classcat([
                        'h-8 ow:border-text-10 ow:px-4 ow:text-text-30 [&>svg]:h-4 [&>svg]:w-4',
                      ])}
                    >
                      {date?.from ? (
                        date.to ? (
                          <>
                            {dayjs(date.from).format('MMM DD, YYYY')} -{' '}
                            {dayjs(date.to).format('MMM DD, YYYY')}
                          </>
                        ) : (
                          dayjs(date.from).format('MMM DD, YYYY')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto bg-secondary p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button type="submit" className="ow:w-[138px]">
                Go
              </Button>
            </form>
          </FormProvider>
        </div>
        <HomeAdvVertical
          className="ow:relative ow:top-0 ow:w-full"
          btnClasses="ow:left-auto mt-2.5"
        />
      </div>
    </div>
  );
}

type AccountCompProps = {
  name: string;
  getstreamId: string;
  aboutMe: string | null;
  avatar: string | null;
  following: boolean;
};

function AccountComp({ name, aboutMe, avatar, following, getstreamId }: AccountCompProps) {
  const { client } = useGetFeedUser();
  const [follow, setFollow] = useState(following);

  const timelineFeed = useMemo(() => client?.feed('timeline'), [client]);

  const avtUrl = avatar ?? 'https://getstream.imgix.net/images/random_svg/A.png';

  const followUser = () => {
    if (!timelineFeed) return;

    api.communityFollowUser.mutate({ targetGetstreamId: getstreamId }).then((data) => {
      if (data.success) {
        setFollow(true);
      }
    });
  };

  const unfollowUser = () => {
    if (!timelineFeed) return;

    api.communityUnfollowUser.mutate({ targetGetstreamId: getstreamId }).then((data) => {
      if (data.success) {
        setFollow(false);
      }
    });
  };

  const toggleFollow = (follow: boolean) => () => {
    if (follow) return unfollowUser();
    return followUser();
  };

  return (
    <div className="mb-6 flex items-start border-b-[1px] border-solid border-text-10 pb-8">
      <Avatar image={urlWithIpfs(avtUrl)} size={46} circle className="mr-2 rounded-full" />
      <div className="flex grow flex-col justify-between md:flex-row">
        <div className=" mb-8 md:mb-0">
          <Link href={`/community/profile/${getstreamId}`} className="mb-2 text-lg">
            @{name}
          </Link>
          <p className="text-sm text-text-50">{aboutMe ?? ''}</p>
        </div>
        <button
          className={classcat([
            'border-green-gradient relative z-[1] mr-auto h-fit rounded-full px-[33.5px] py-[9.5px] text-body1 font-bold md:ml-auto md:mr-0',
          ])}
        >
          <span onClick={toggleFollow(follow)} className="text-gradient-pr">
            {follow ? 'Following' : 'Follow'}
          </span>
        </button>
      </div>
    </div>
  );
}

const TAB_MENU = [
  { label: 'All', key: 'all' },
  { label: 'Account', key: 'account' },
  { label: 'Post', key: 'post' },
];
