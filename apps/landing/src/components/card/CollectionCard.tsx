//THIRD PARTY MODULES
import classcat from 'classcat';

export type CollectionCard = {
  url: string;
  name: string;
  prices: string;
  pricesDollar?: string;
  description?: string;
  owner?: string;
};
export type CollectionCardProps = {
  view?: string;
  value: CollectionCard;
};
export default function CollectionCard({ view, value }: CollectionCardProps) {
  if (view === 'list') return <ListView value={value} />;
  return <GridView value={value} />;
}

function GridView({ value, ...props }: CollectionCardProps) {
  return (
    <div
      className="rounded-[10px] border border-[#303030] px-2.25 py-3.75 xlg:px-3.75 xlg:py-5"
      {...props}
    >
      <div className="aspect-square overflow-hidden rounded-[10px] border-[.5px] border-white/[.13]">
        <img src={value.url} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="body-3 mt-1.25 xlg:mt-4 xlg:text-body2">{value.name}</p>
      <p className="text-caption text-text-50 xlg:text-body3">
        Creator: <span className="text-text-80">@{value.owner}</span>
      </p>
      <hr className="my-1.25 h-[0.5px] border-none bg-text-10" />
      <div className="flex items-center justify-between text-caption text-text-70 xlg:text-body3">
        <span>Volume</span>
        <span>{value.prices}</span>
      </div>
    </div>
  );
}

function ListView({ value, ...props }: CollectionCardProps) {
  return (
    <div
      className={classcat([
        'rounded-[10px] border border-[#303030] p-5 xlg:pb-5.5 xlg:pt-3.5',
        'md:flex',
      ])}
      {...props}
    >
      <div
        className={classcat([
          'mx-auto rounded-[10px] border-[.5px] border-white/[.13]',
          'aspect-square max-w-[12.5rem] shrink-0 overflow-hidden md:mr-8.75',
        ])}
      >
        <img src={value.url} alt="image" className="h-full w-full object-cover" />
      </div>
      <div className="text-center md:text-start">
        <p className="mt-2 text-h6 xlg:mt-4 xlg:text-h5-bold">{value.name}</p>
        <p className="mt-1 text-body3 text-text-60">{value.description}</p>
        <p className="mt-1 text-subtitle2 text-primary">Created by: @{value.owner}</p>
        <div className="mt-1.5 flex items-center justify-center text-h6 text-text-100 md:justify-start md:text-h5">
          <p>
            <span className="mr-1 text-subtitle2 font-normal text-text-50">Volume</span>
            {value.prices}
          </p>
          <span className="ml-1.25 text-subtitle2 font-normal text-text-50">
            {value.pricesDollar}
          </span>
        </div>
      </div>
    </div>
  );
}
