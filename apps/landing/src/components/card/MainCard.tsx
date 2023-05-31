//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import CartIcon from '_@shared/icons/CartIcon';

export type CardValue = {
  url: string;
  name: string;
  prices: string;
  pricesDollar?: string;
  description?: string;
  owner?: string;
};

export type MainCardProps = {
  view?: string;
  value: CardValue;
};

export default function MainCard({ view = 'grid', value }: MainCardProps) {
  if (view === 'list') return <ListView value={value} />;
  return <GridView value={value} />;
}

function GridView({ value, ...props }: MainCardProps) {
  return (
    <div className="rounded-[10px] border border-[#303030] px-4 py-4.5 xlg:py-5" {...props}>
      <div className="aspect-square overflow-hidden rounded-[10px] border-[.5px] border-white/[.13]">
        <img src={value.url} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="body-3 mt-2 xlg:mt-4 xlg:text-body2">{value.name}</p>
      <span className="mt-1.5 text-caption text-text-80 xlg:mt-1.25 xlg:text-body3">
        {value.prices}
      </span>
      <div className="mt-2.5 flex">
        <Button className={classcat(['mr-1 h-7 p-0 ow:rounded-[5px] xlg:h-10'])}>Buy now</Button>
        <Button
          className={classcat([
            'h-7 border-none bg-white p-0 ow:w-8.75 ow:rounded-[5px] xlg:h-10 xlg:w-12',
            'shrink-0',
          ])}
        >
          <CartIcon className="h-4 w-4 xlg:h-5 xlg:w-5" />
        </Button>
      </div>
    </div>
  );
}

function ListView({ value, ...props }: MainCardProps) {
  return (
    <div
      className={classcat([
        'rounded-[10px] border border-[#303030] px-3.5 pb-7 pt-6 xlg:pb-4 xlg:pt-3.5',
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
        <p className="mt-1 text-subtitle2 text-primary">By {value.owner}</p>
        <div className="mt-1.5 flex items-center justify-center text-h6 text-text-100 md:justify-start md:text-h5">
          <span>{value.prices} </span>
          <span className="ml-1.25 text-subtitle2 text-text-50">{value.pricesDollar}</span>
        </div>
        <div className="mt-2.5 flex justify-center md:justify-start">
          <Button className={classcat(['mr-1 h-10 max-w-[9.25rem] p-0 ow:rounded-[5px] xlg:h-10'])}>
            Buy now
          </Button>
          <Button
            className={classcat([
              'h-10 border-none bg-white p-0 ow:w-12 ow:rounded-[5px] xlg:h-10 xlg:w-12',
              'shrink-0',
            ])}
          >
            <CartIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
