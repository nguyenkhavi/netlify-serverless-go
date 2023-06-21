'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { useRef, useState } from 'react';
import { Avatar } from 'react-activity-feed';
import { api, RouterOutputs } from '_@landing/utils/api';
import { usePathname, useSearchParams } from 'next/navigation';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import SearchInput from '_@shared/components/SearchInput';
//RELATIVE MODULES
import ActivityCard from '../comps/ActivityCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get('type') || 'all';

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
        type: 'POST',
        keyword: searchText.current.value,
        paging: { page: 1, pageSize: 4 },
        peopleFilter: 'FOLLOWING',
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

  return (
    <>
      <div>
        <SearchInput
          ref={searchText}
          name="search"
          type="text"
          placeholder="Search"
          className={classcat([
            'h-10  md:text-body1',
            'ow:border-[.5px] ow:border-text-10 ow:bg-secondary-300',
          ])}
          iconPosition="right"
          onKeyDown={(e: KeyboardEvent) => {
            e.key === 'Enter' && _handleSearch();
          }}
          onClickIcon={_handleSearch}
        />
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
        <div>
          {searchedUsers &&
            searchedUsers.map((user) => (
              <AccountComp
                key={user.userId}
                name={user.username}
                aboutMe={user.aboutMe}
                avatar={user.avatar}
                following={user.following}
              />
            ))}
        </div>
        <Show when={searchedUsers && searchedUsers.length > 4}>
          <button className="text-gradient-pr relative left-1/2 -translate-x-1/2 before:absolute before:bottom-0 before:h-[1px] before:w-full before:bg-main-gradient">
            View All
          </button>
        </Show>
      </section>

      <Show when={query === 'all'}>
        <HomeAdvHorizontal />
      </Show>
      <div className="mt-6 grid gap-6">
        {searchedPosts &&
          searchedPosts.map((post) => <ActivityCard key={post.id} activity={post} />)}
      </div>
    </>
  );
}

type AccountCompProps = {
  name: string;
  aboutMe: string | null;
  avatar: string | null;
  following: boolean;
};

function AccountComp({ name, aboutMe, avatar, following }: AccountCompProps) {
  const avtUrl = avatar ?? 'https://getstream.imgix.net/images/random_svg/A.png';

  return (
    <div className="mb-6 flex items-start border-b-[1px] border-solid border-text-10 pb-8">
      <Avatar image={avtUrl} size={46} circle className="mr-2 rounded-full" />
      <div className="flex grow flex-col justify-between md:flex-row">
        <div className=" mb-8 w-[273px] md:mb-0">
          <p className="mb-2 text-lg">@{name}</p>
          <p className="text-sm text-text-50">{aboutMe ?? ''}</p>
        </div>
        <button
          className={classcat([
            'border-green-gradient relative z-[1] mr-auto h-fit rounded-full px-[33.5px] py-[9.5px] text-body1 font-bold md:ml-auto md:mr-0',
          ])}
        >
          <span className="text-gradient-pr">{following ? 'Following' : 'Follow'}</span>
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
