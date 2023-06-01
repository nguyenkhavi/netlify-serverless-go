'use client';
//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import { MOCK_DATA_CATEGORY_ITEM } from '_@landing/mock/Item';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import CategoryCard from '_@landing/components/card/CategoryCard';
import ContentWithBack from '_@landing/components/content-box/ContentWithBack';

export default function CategoryPage() {
  return (
    <ContentWithBack title="All Categories" path="/marketplace">
      {MOCK_DATA_CATEGORY_ITEM.map((item, index) => (
        <React.Fragment key={index}>
          <CategoryCard value={item} />
          {(index + 1) % 4 === 0 ? (
            <HomeAdvHorizontal
              className={classcat(['col-span-full', index + 1 === 4 ? 'md:hidden' : ''])}
              isHome={false}
            />
          ) : null}
        </React.Fragment>
      ))}
    </ContentWithBack>
  );
}
