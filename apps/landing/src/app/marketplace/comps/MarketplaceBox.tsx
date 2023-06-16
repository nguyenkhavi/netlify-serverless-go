'use client';
//RELATIVE MODULES

type MarketplaceBoxProps = {
  children: React.ReactNode;
  leftContent?: React.ReactNode;
};

export default function MarketplaceBox({ children, leftContent }: MarketplaceBoxProps) {
  return (
    <div className="flex px-[--px] py-6 xlg:py-24">
      <div className="hidden w-[284px] shrink-0 xlg:block">{leftContent}</div>
      <div className="relative grid h-max grow gap-6 xlg:ml-8 xlg:gap-10">{children}</div>
    </div>
  );
}
