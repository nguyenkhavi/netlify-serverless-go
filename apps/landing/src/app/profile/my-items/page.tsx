'use client';
//THIRD PARTY MODULES
const Link = require('next/link');
//THIRD PARTY MODULES
import { useRouter, useSearchParams } from 'next/navigation';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import * as Tab from '_@shared/components/tabs/BaseTab';
//RELATIVE MODULES
import ItemContent from './comps/ItemContent';
import ProfileNavMobile from '../comps/ProfileNavMobile';
import CollectionContent from './comps/CollectionContent';

export default function MyItems() {
  const router = useRouter();
  const query = useSearchParams();

  const tabActive = query.get('t') !== '2' ? '1' : '2';

  const _handleTabChange = (value: string) => {
    router.push('/profile/my-items?t=' + value);
  };

  return (
    <div className="rounded-lg lg:bg-secondary-200 lg:p-4">
      <ProfileNavMobile title="My Items" isBorder={false} />
      <Tab.Root value={tabActive} onValueChange={_handleTabChange}>
        <Tab.List className="relative items-center pt-5.25 lg:pt-7.75">
          {TABS.map((tab, index) => (
            <Tab.Trigger key={index} value={tab.value} className="px-1 pb-2.75 pt-0.25">
              {tab.label}
            </Tab.Trigger>
          ))}
          {tabActive === '1' ? (
            <Button
              as={Link}
              href="/profile/create/collection"
              className="btnsm absolute bottom-2.75 right-0 ml-auto w-max px-2 lg:btnmd lg:px-5 lg:[&>span]:text-xs"
            >
              Create Collection
            </Button>
          ) : (
            <Button
              as={Link}
              href="/profile/create/nft"
              className="btnsm absolute bottom-2.75 right-0 ml-auto w-max px-2 lg:btnmd lg:px-5 lg:[&>span]:text-xs"
            >
              Create NFT
            </Button>
          )}
        </Tab.List>
        {TABS.map((tab, index) => (
          <Tab.Content key={index} value={tab.value}>
            {tab.content}
          </Tab.Content>
        ))}
      </Tab.Root>
    </div>
  );
}

const TABS = [
  { value: '1', label: 'My Collection', content: <CollectionContent /> },
  { value: '2', label: 'My Items', content: <ItemContent /> },
];
