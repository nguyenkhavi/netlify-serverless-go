'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { Avatar } from 'react-activity-feed';
import { usePathname, useSearchParams } from 'next/navigation';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get('type') || 'all';

  return (
    <div>
      <div className="border-b-[1px] border-solid border-text-10">
        {TAB_MENU.map((tab, idx) => (
          <Link
            key={idx}
            href={{
              pathname,
              query: { ...Object.fromEntries(searchParams), type: tab.key },
            }}
            className={classcat([
              'inline-block w-[92px] pb-[11px] pt-[1px] text-center text-sm text-text-50 lg:w-[134px] lg:text-h5',
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
          {MOCK_USERS.map((user) => (
            <AccountComp key={user.id} name={user.name} bio={user.bio} />
          ))}
        </div>
        <Show when={MOCK_USERS.length > 4}>
          <button className="text-gradient-pr relative left-1/2 -translate-x-1/2 before:absolute before:bottom-0 before:h-[1px] before:w-full before:bg-main-gradient">
            View All
          </button>
        </Show>
      </section>
      <Show when={query === 'all'}>
        <HomeAdvHorizontal />
      </Show>
    </div>
  );
}

function AccountComp({ name, bio }: { name: string; bio: string }) {
  return (
    <div className="mb-6 flex items-start border-b-[1px] border-solid border-text-10 pb-8">
      <Avatar
        image="https://getstream.imgix.net/images/random_svg/A.png"
        size={46}
        circle
        className="mr-2 rounded-full"
      />
      <div className="flex grow flex-col justify-between md:flex-row">
        <div className=" mb-8 w-[273px] md:mb-0">
          <p className="mb-2 text-lg">@{name}</p>
          <p className="text-sm text-text-50">{bio}</p>
        </div>
        <button
          className={classcat([
            'border-green-gradient relative z-[1] mr-auto h-fit rounded-full px-[33.5px] py-[9.5px] text-body1 font-bold md:ml-auto md:mr-0',
          ])}
        >
          <span className="text-gradient-pr">Follow</span>
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

const MOCK_USERS = [
  {
    id: '1',
    name: 'Lucas_Williams',
    bio: 'Design amazing digital experiences that create more happy in the world.design amazing digital experiences that  create more happy in the world.',
  },
  {
    id: '2',
    name: 'Thanhlam',
    bio: 'Design amazing digital experiences that create more happy in the world.design amazing digital experiences that  create more happy in the world.',
  },
  {
    id: '3',
    name: 'NhatHiep',
    bio: 'Design amazing digital experiences that create more happy in the world.design amazing digital experiences that  create more happy in the world.',
  },
];
