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
    <div className="rounded-lg">
      <ProfileNavMobile title="My Items" isBorder={false} />
      <Tab.Root value={tabActive} onValueChange={_handleTabChange}>
        <div className="rounded-t-lg pt-4 lg:bg-secondary-200 lg:px-4">
          <Tab.List className="flex items-end justify-between">
            <div>
              {TABS.map((tab, index) => (
                <Tab.Trigger key={index} value={tab.value} className="px-1 pb-2.75 pt-0.25">
                  {tab.label}
                </Tab.Trigger>
              ))}
            </div>
            <div className="pb-2.5">
              {tabActive === '1' ? (
                <Button
                  as={Link}
                  href="/profile/create/collection"
                  className="lg:btnmd ow:w-29.25 ow:lg:w-34.5"
                >
                  Create Collection
                </Button>
              ) : (
                <Button
                  as={Link}
                  href="/profile/create/nft"
                  className="lg:btnmd ow:w-29.25 ow:lg:w-34.5"
                >
                  Create NFT
                </Button>
              )}
            </div>
          </Tab.List>
        </div>
        {TABS.map((tab, index) => (
          <Tab.Content key={index} value={tab.value} className="ow:mt-0 ow:lg:mt-0">
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
