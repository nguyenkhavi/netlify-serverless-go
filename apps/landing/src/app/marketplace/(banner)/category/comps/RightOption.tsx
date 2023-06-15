//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import BaseSelect from '_@shared/components/select/BaseSelect';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import GridIcon from '_@shared/icons/GridIcon';
import FilterIcon from '_@shared/icons/FilterIcon';
import ListViewIcon from '_@shared/icons/ListViewIcon';

const OPTIONS = [
  { label: 'Release Date: Latest', value: 'release-date-latest' },
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price-low-to-high' },
  { label: 'Price: High to Low', value: 'price-low-to-low' },
  { label: 'Release Date: Oldest', value: 'release-date-oldest' },
  { label: 'Trending', value: 'trending' },
];
type RightOptionProps = {
  view: string;
};
export default function RightOption({ view }: RightOptionProps) {
  const [openFilter, setOpenFilter] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  const _handleChangeView = (view: string) => {
    const newQuery = new URLSearchParams(query);
    newQuery.set('view', view);
    router.push(pathname + '?' + newQuery.toString());
  };

  return (
    <div className="ml-auto flex items-center lg:mb-2">
      <BaseSelect
        name="filter"
        options={OPTIONS}
        placeholder="Filters"
        owStyles={{
          triggerClasses:
            'h-full ow:rounded w-auto min-w-[9.625rem] text-caption hidden lg:block ow:text-text-60',
          itemClasses: 'ow:py-2 ow:my-0 text-base ow:h-auto',
          contentClasses: 'ow:py-2',
        }}
      />
      <Popover open={openFilter} onOpenChange={(open) => setOpenFilter(open)}>
        <PopoverTrigger>
          <div
            className="ml-2 flex h-7.5 items-center rounded bg-secondary-200 px-1 lg:ml-4 lg:hidden"
            onClick={() => setOpenFilter(true)}
          >
            <FilterIcon className="h-5" />
            <span className="ml-1 text-body3 text-text-50">Filters</span>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <FilterContent setOpenFilter={setOpenFilter} />
        </PopoverContent>
      </Popover>
      <div
        className={classcat([
          'flex h-7.5 w-16 items-center justify-between rounded bg-secondary-200 px-2.25',
          'ml-2 lg:h-11 lg:w-30.75 lg:border lg:border-text-10 lg:px-7',
        ])}
      >
        <button onClick={() => _handleChangeView('list')}>
          <ListViewIcon
            className="h-3.5 data-[active=true]:text-primary"
            data-active={view === 'list'}
          />
        </button>
        <button onClick={() => _handleChangeView('grid')}>
          <GridIcon
            className="h-3.5 data-[active=true]:text-primary"
            data-active={view === 'grid'}
          />
        </button>
      </div>
    </div>
  );
}

const MOCK_PRICE = [
  { label: 'Under $100', path: '100' },
  { label: '$100 to $500', path: '100-500' },
  { label: '$500 to $1000', path: '500-1000' },
  { label: '$1000 to $5000', path: '1000-5000' },
];

const inputClasses = [
  'h-7.5 w-17.5 bg-black text-text-50 outline-none',
  'py-[3px] px-3 text-btnmd placeholder:text-text-30',
  'rounded mr-2.5',
];

function FilterContent({ setOpenFilter }: { setOpenFilter: (open: boolean) => void }) {
  const _handleClick = () => {
    setOpenFilter(false);
  };
  return (
    <div>
      <h3 className="mb-1 text-h5 text-text-100">Price:</h3>
      <div className="flex flex-col [&>button:not(:last-child)]:mb-2">
        {MOCK_PRICE.map((price, i) => (
          <button
            type="button"
            key={i}
            className="w-max text-body1 text-text-50"
            onClick={_handleClick}
          >
            {price.label}
          </button>
        ))}
      </div>
      <div className="mt-3.75 flex">
        <input type="text" className={classcat([inputClasses])} placeholder="$ Min" />
        <input type="text" className={classcat([inputClasses])} placeholder="$ Max" />
        <Button className="btnmd h-7.5 px-0 ow:w-14.75 ow:rounded" onClick={_handleClick}>
          Go
        </Button>
      </div>
      <hr className="my-4 h-[.5px] w-full border-none bg-text-10" />
      <div className="flex flex-col [&>button:not(:last-child)]:mb-2">
        {OPTIONS.map((price, i) => (
          <button
            type="button"
            key={i}
            className="w-max text-body1 text-text-50"
            onClick={_handleClick}
          >
            {price.label}
          </button>
        ))}
      </div>
      <button className="mx-auto mt-11 block cursor-pointer text-center text-underline underline">
        Clear filters
      </button>
    </div>
  );
}
