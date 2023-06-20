'use client';
//THIRD PARTY MODULES
import React from 'react';
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
import TopSellers from '_@landing/app/marketplace/comps/TopSellers';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import MarketplaceBox from '_@landing/app/marketplace/comps/MarketplaceBox';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
//RELATIVE MODULES
import BrowseCategory from '../comps/BrowseCategory';
import TrendingContent from '../comps/TrendingContent';

export default function Marketplace() {
  const { category } = useIndexedDBContext();

  return (
    <MarketplaceBox
      leftContent={
        <>
          <BrowseCategory />
          <HomeAdvVertical
            className="relative h-auto w-full py-8 ow:top-6 ow:px-15 xl:grid"
            btnClasses="ow:static mt-6.25"
          />
        </>
      }
    >
      <TopSellers />
      {category.data.map((category, index) => (
        <React.Fragment key={index}>
          <TrendingContent
            title={`Trending in ${category.name}`}
            pathViewAll={`/marketplace/category/${category.id}`}
            category={category}
          />
          <Show when={(index + 1) % 2 === 0}>
            <HomeAdvHorizontal className="w-[--content-width] md:w-auto" isHome={false} />
          </Show>
        </React.Fragment>
      ))}
    </MarketplaceBox>
  );
}
