'use client';
//THIRD PARTY MODULES
import FilterPrice from '_@landing/app/marketplace/comps/FilterPrice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MarketplaceBox from '_@landing/app/marketplace/comps/MarketplaceBox';
import BrowseCategory from '_@landing/app/marketplace/comps/BrowseCategory';
//LAYOUT, COMPONENTS
import MarketplaceTab from '_@shared/components/tabs/MarketplaceTab';
import BasePagination from '_@shared/components/pagination/BasePagination';
//RELATIVE MODULES
import RightOption from './comps/RightOption';
import TabContentArtItems from './comps/TabContentArtItems';
import TabContentCollection from './comps/TabContentCollection';

export default function FilterByCategory({ params }: { params: { category: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const view = query.get('view') || 'grid';

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
      <MarketplaceTab
        tabs={[
          { label: 'Arts Items', value: 'arts items', content: <TabContentArtItems view={view} /> },
          {
            label: 'Collections',
            value: 'collections',
            content: <TabContentCollection view={view} />,
          },
        ]}
        ariaLabel="marketplace-tab"
        rightOptions={<RightOption view={view} />}
        onValueChange={_handleTabChange}
      />
      <div className="flex justify-center">
        <BasePagination perPage={1} totalItems={20} />
      </div>
    </MarketplaceBox>
  );
}
