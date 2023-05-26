'use client';
//THIRD PARTY MODULES
import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical'
//RELATIVE MODULES
import FilterPrice from './FilterPrice'
import BrowseCategory from './BrowseCategory'

export default function MarketplaceBox({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const isFilterCategory = useMemo(() => params.category !== undefined, [params.category]);
  return (
    <div className="flex px-[--px] pb-8.5 pt-6.25">
      <div className="hidden w-[284px] xlg:block">
        <BrowseCategory />
        {isFilterCategory ? (
          <FilterPrice />
        ) : (
          <HomeAdvVertical
            className="relative h-auto w-full py-8 xl:grid"
            btnClasses="ow:static mt-6.25"
          />
        )}
      </div>
      <div className="grid gap-6.25 xlg:ml-8">{children}</div>
    </div>
  );
}
