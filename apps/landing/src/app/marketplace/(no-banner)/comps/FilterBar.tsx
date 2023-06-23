//THIRD PARTY MODULES
import classcat from 'classcat';
import { useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import SearchInput from '_@shared/components/SearchInput';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import MenuIcon from '_@shared/icons/MenuIcon';
import FilterIcon from '_@shared/icons/FilterIcon';

const FILTER_PRICE = [
  { label: 'Under $100', path: '100' },
  { label: '$100 to $500', path: '100-500' },
  { label: '$500 to $1000', path: '500-1000' },
  { label: '$1000 to $5000', path: '1000-5000' },
];

const FILTER_ITEMS = [
  { value: 'hot-product', label: 'Hot Products 💥' },
  { value: 'low-to-high', label: 'Price: Low to High' },
  { value: 'high-to-low', label: 'Price: High to Low' },
  { value: 'latest', label: 'Release Date: Latest' },
  { value: 'oldest', label: 'Release Date: Oldest' },
];

const inputClasses = [
  'h-7.5 w-17.5 bg-black text-text-50 outline-none',
  'py-[3px] px-3 text-btnmd placeholder:text-text-30',
  'rounded mr-2.5',
];
const buttonFilterClasses = [
  'ml-2 flex h-full items-center rounded-lg bg-secondary-200 px-3.5',
  'border border-solid border-text-10',
];

type FilterItemProps = {
  showOptionsLeft?: boolean;
};
export default function FilterBar({ showOptionsLeft = true }: FilterItemProps) {
  const [openFilter, setOpenFilter] = useState(false);
  const [openFilterItems, setOpenFilterItems] = useState(false);
  const searchText = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const view = params.get('view') || 'item';

  const _handleChangeView = (view: string) => {
    router.push(`${pathname}?view=${view}`);
  };

  return (
    <section
      className={classcat([
        'mx-auto mt-6 w-[--content-width] pb-4 xlg:mt-12',
        'xlg:border-b xlg:border-white/[.15]',
        'flex flex-col justify-between md:flex-row',
      ])}
    >
      <Show when={showOptionsLeft}>
        <div className="flex">
          <Button
            data-active={view === 'category'}
            variant="outlined"
            className={classcat([
              'ow:w-35 ow:rounded-[20px]',
              'border-text-30 text-text-50 ow:border-[1.5px] ow:[&>span]:text-subtitle1',
              'hover:bg-transparent [&>span]:hover:text-primary [&>svg]:hover:text-primary',
              'data-[active=true]:border-primary data-[active=true]:text-primary',
            ])}
            leadingIcon={<MenuIcon />}
            onClick={() => _handleChangeView('category')}
          >
            Categories
          </Button>
          <button
            data-active={view === 'item'}
            className={classcat([
              'text-text-50 data-[active=true]:text-gradient-pr',
              'hover:text-gradient-pr',
              'ml-6 text-h5 data-[active=true]:text-h5-bold',
            ])}
            onClick={() => _handleChangeView('item')}
          >
            All Items
          </button>
        </div>
      </Show>
      <div className="ml-2 mt-6 flex grow md:mt-0 md:justify-end">
        <SearchInput
          ref={searchText}
          name="search"
          type="text"
          placeholder="Type here"
          className={classcat([
            'grow ow:h-11.25',
            'border-none ow:bg-secondary-200 md:text-body1',
            'sm:h-11.25',
          ])}
          boxClasses="max-w-[324px] md:w-full"
        />
        <Popover open={openFilter} onOpenChange={(open) => setOpenFilter(open)}>
          <PopoverTrigger>
            <div
              className={classcat([buttonFilterClasses, ' md:hidden'])}
              onClick={() => setOpenFilter(true)}
            >
              <FilterIcon className="h-5" />
              <span className="ml-1 whitespace-nowrap text-body3 text-text-50">Filter search</span>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <FilterPrice setOpenFilter={setOpenFilter} />
          </PopoverContent>
        </Popover>
        <Popover open={openFilterItems} onOpenChange={(open) => setOpenFilterItems(open)}>
          <PopoverTrigger>
            <div
              className={classcat([buttonFilterClasses, 'hidden md:flex'])}
              onClick={() => setOpenFilterItems(true)}
            >
              <FilterIcon className="h-5" />
              <span className="ml-1 whitespace-nowrap text-body3 text-text-50">Filter items</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="ow:px-0 ow:py-2.5">
            <FilterItem setOpenFilter={setOpenFilterItems} />
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}

function FilterPrice({ setOpenFilter }: { setOpenFilter: (open: boolean) => void }) {
  const _handleClick = () => {
    setOpenFilter(false);
  };
  return (
    <div>
      <h3 className="mb-1 text-h5 text-text-100">Price:</h3>
      <div className="flex flex-col [&>button:not(:last-child)]:mb-2">
        {FILTER_PRICE.map((price, i) => (
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
    </div>
  );
}

function FilterItem({ setOpenFilter }: { setOpenFilter: (open: boolean) => void }) {
  const _handleClick = () => {
    setOpenFilter(false);
  };
  return (
    <ul>
      {FILTER_ITEMS.map((item, i) => (
        <li
          key={i}
          className="cursor-pointer px-4.5 py-1 text-caption text-text-60 hover:bg-[#19CA9B]/[.21]"
          onClick={_handleClick}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}
