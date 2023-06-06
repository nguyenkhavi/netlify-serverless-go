'use client';
//THIRD PARTY MODULES
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import * as Tab from '_@shared/components/tabs/BaseTab';
import BasePagination from '_@shared/components/pagination/BasePagination';
//RELATIVE MODULES
import ItemContent from './comps/ItemContent';
import ProfileNavMobile from '../comps/ProfileNavMobile';
import CollectionContent from './comps/CollectionContent';

export default function MyItems() {
  const [tabActive, setTabActive] = useState('1');
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  const _handleTabChange = (value: string) => {
    const newQuery = new URLSearchParams(query);
    newQuery.set('page', '1');
    router.push(`${pathname}?${newQuery.toString()}`);
    setTabActive(value);
  };

  return (
    <div>
      <ProfileNavMobile title="My Items" />
      <Tab.Root defaultValue={TABS[0].value} onValueChange={_handleTabChange}>
        <Tab.List className="items-center">
          {TABS.map((tab, index) => (
            <Tab.Trigger key={index} value={tab.value} className="py-5">
              {tab.label}
            </Tab.Trigger>
          ))}
          {tabActive === '1' ? (
            <Button className="btnsm ml-auto w-max px-2 lg:btnmd lg:px-5">Create Collection</Button>
          ) : (
            <Button className="btnsm ml-auto w-max px-2 lg:btnmd lg:px-5">Create NFT</Button>
          )}
        </Tab.List>
        {TABS.map((tab, index) => (
          <Tab.Content key={index} value={tab.value}>
            {tab.content}
          </Tab.Content>
        ))}
      </Tab.Root>
      <div className="mt-10 flex justify-center">
        <BasePagination perPage={1} totalItems={20} />
      </div>
    </div>
  );
}

const TABS = [
  { value: '1', label: 'My Collection', content: <CollectionContent /> },
  { value: '2', label: 'My Items', content: <ItemContent /> },
];
