'use client';
//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
import TopSellers from '_@landing/app/marketplace/comps/TopSellers';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import MarketplaceBox from '_@landing/app/marketplace/comps/MarketplaceBox';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import { SkeCard, SkeLine } from '_@landing/components/skeleton/skeleton';
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
            className="relative h-auto w-full py-8 ow:top-6 ow:px-15 xlg:grid"
            btnClasses="ow:static mt-6.25"
          />
        </>
      }
    >
      <TopSellers />
      {category.loading
        ? Array.from({ length: 2 }).map((_, index) => (
            <div key={index}>
              <SkeLine className="mb-6 ow:h-4 ow:w-50" />
              <div
                className={classcat([
                  'hidden-scrollbar grid gap-6 overflow-x-auto overflow-y-clip md:overflow-visible',
                  'grid-cols-[227.5px_227.5px_227.5px_227.5px] md:grid-cols-4',
                  'p-[1px] md:w-auto md:p-0',
                  'w-[calc(var(--content-width)+16px)] pr-4 md:pr-0',
                ])}
              >
                {Array.from({ length: 4 }).map((_, indexItem) => (
                  <SkeCard
                    key={indexItem}
                    paragraph
                    className="[&>div:first-child]:aspect-square [&>div:first-child]:h-auto"
                  />
                ))}
              </div>
            </div>
          ))
        : category.data.map((category, index) => (
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
