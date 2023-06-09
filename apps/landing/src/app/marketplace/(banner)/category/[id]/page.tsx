'use client';
//THIRD PARTY MODULES
import FilterPrice from '_@landing/app/marketplace/comps/FilterPrice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MarketplaceBox from '_@landing/app/marketplace/comps/MarketplaceBox';
import BrowseCategory from '_@landing/app/marketplace/comps/BrowseCategory';
//LAYOUT, COMPONENTS
import * as Tab from '_@shared/components/tabs/BaseTab';
import BasePagination from '_@shared/components/pagination/BasePagination';
//RELATIVE MODULES
import RightOption from '../comps/RightOption';
import TabContentArtItems from '../comps/TabContentArtItems';
import TabContentCollection from '../comps/TabContentCollection';
//RELATIVE MODULES

export default function FilterByCategory({ params }: { params: { category: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const view = query.get('view') && query.get('view') !== 'list' ? 'grid' : 'list';

  const TABS = [
    {
      label: 'Arts Items',
      value: 'arts items',
      content: <TabContentArtItems view={view} />,
    },
    {
      label: 'Collections',
      value: 'collections',
      content: <TabContentCollection view={view} />,
    },
  ];
  const _handleTabChange = () => {
    const newQuery = new URLSearchParams(query);
    newQuery.set('page', '1');
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
      <Tab.Root defaultValue={TABS[0].value} onValueChange={_handleTabChange}>
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
      <div className="flex justify-center">
        <BasePagination perPage={1} totalItems={20} />
      </div>
    </MarketplaceBox>
  );
}
