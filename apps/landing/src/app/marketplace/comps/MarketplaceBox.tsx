'use client';
//RELATIVE MODULES
import BrowseCategory from './BrowseCategory';

type MarketplaceBoxProps = {
  children: React.ReactNode;
  leftContent?: React.ReactNode;
};

export default function MarketplaceBox({ children, leftContent }: MarketplaceBoxProps) {
  return (
    <div className="flex px-[--px] pb-8.5 pt-6.25">
      <div className="hidden w-[284px] shrink-0 xlg:block">
        <BrowseCategory />
        {leftContent}
      </div>
      <div className="relative grid grow gap-6.25 xlg:ml-8">{children}</div>
    </div>
  );
}
