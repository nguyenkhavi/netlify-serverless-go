'use client';
//THIRD PARTY MODULES
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
import FilterPrice from '_@landing/app/marketplace/comps/FilterPrice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import BrowseCategory from '_@landing/app/marketplace/comps/BrowseCategory';
import MarketplaceBox from '_@landing/app/marketplace/comps/MarketplaceBox';
//LAYOUT, COMPONENTS
import * as Tab from '_@shared/components/tabs/BaseTab';
//RELATIVE MODULES
import RightOption from '../comps/RightOption';
import TabContentArtItems from '../comps/TabContentArtItems';
import TabContentCollection from '../comps/TabContentCollection';
//RELATIVE MODULES

export default function FilterByCategory({ params }: { params: { id: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const view = query.get('view') && query.get('view') !== 'list' ? 'grid' : 'list';
  const tabActive = query.get('tab') || 'item';

  const TABS = [
    {
      label: 'Art Items',
      value: 'item',
      content: <TabContentArtItems view={view} categoryId={params.id} />,
    },
    {
      label: 'Collections',
      value: 'collection',
      content: <TabContentCollection view={view} categoryId={params.id} />,
    },
  ];
  const _handleTabChange = (value: string) => {
    const newQuery = new URLSearchParams(query);
    newQuery.set('page', '1');
    newQuery.set('tab', value);
    router.push(`${pathname}?${newQuery.toString()}`);
  };
  return (
    <MarketplaceBox
      leftContent={
        <>
          <BrowseCategory />
          <FilterPrice />
        </>
      }
    >
      <Tab.Root value={tabActive} onValueChange={_handleTabChange}>
        <Tab.List>
          {TABS.map((tab, index) => (
            <Tab.Trigger key={index} value={tab.value}>
              {tab.label}
            </Tab.Trigger>
          ))}
          <RightOption view={view} />
        </Tab.List>
        {TABS.map((tab, index) => (
          <Tab.Content key={index} value={tab.value}>
            {tab.content}
          </Tab.Content>
        ))}
      </Tab.Root>
    </MarketplaceBox>
  );
}
