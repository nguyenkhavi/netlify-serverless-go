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
    <div>
      <ProfileNavMobile title="My Items" />
      <Tab.Root value={tabActive} onValueChange={_handleTabChange}>
        <Tab.List className="items-center">
          {TABS.map((tab, index) => (
            <Tab.Trigger key={index} value={tab.value} className="py-5">
              {tab.label}
            </Tab.Trigger>
          ))}
          {tabActive === '1' ? (
            <Button
              as={Link}
              href="/profile/create/collection"
              className="btnsm ml-auto w-max px-2 lg:btnmd lg:px-5"
            >
              Create Collection
            </Button>
          ) : (
            <Button
              as={Link}
              href="/profile/create/nft"
              className="btnsm ml-auto w-max px-2 lg:btnmd lg:px-5"
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
