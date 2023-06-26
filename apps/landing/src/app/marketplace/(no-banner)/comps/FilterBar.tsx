'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import { useState } from 'react';
import { FILTER_ITEMS, PRICE_FILTER } from '_@landing/utils/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Control, Controller, UseFormRegister, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import SearchInput from '_@shared/components/SearchInput';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import MenuIcon from '_@shared/icons/MenuIcon';
import FilterIcon from '_@shared/icons/FilterIcon';
//HOOK
import useFilterQueryString from '_@landing/hooks/useFilterQueryString';

type FilterItemProps = {
  showOptionsLeft?: boolean;
};

const schema = z.object({
  k: z.string().optional(),
  sort: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minMaxPrice: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function FilterBar({ showOptionsLeft = true }: FilterItemProps) {
  const filter = useFilterQueryString();

  const [openFilter, setOpenFilter] = useState(false);
  const [openFilterItems, setOpenFilterItems] = useState(false);
  const pathname = usePathname();
  const query = useSearchParams();
  const router = useRouter();

  const view = query.get('view') || 'item';

  const { handleSubmit, register, control } = useForm<FormValues>({
    defaultValues: {
      k: query.get('k') || '',
      sort: query.get('sort') || '',
      minPrice: query.get('minPrice') || '',
      maxPrice: query.get('maxPrice') || '',
      minMaxPrice: query.get('minMaxPrice') || '',
    },
  });

  const onSubmit = handleSubmit((value) => {
    if (value.minPrice || value.maxPrice) {
      value.minMaxPrice = '';
    }
    filter({ ...value, page: 1 });
  });

  const _handleChangeView = (view: string) => {
    router.push(`${pathname}?view=${view}`);
  };

  const handleResetFilter = () => {
    filter({ minPrice: undefined, maxPrice: undefined, minMaxPrice: undefined });
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
      <form onSubmit={onSubmit} className="ml-2 mt-6 flex grow md:mt-0 md:justify-end">
        <SearchInput
          {...register('k')}
          type="text"
          placeholder="Type here"
          className={classcat([
            'grow ow:h-11.25',
            'ow:bg-secondary-200 ow:text-caption',
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
          <PopoverContent className="rounded-[15px] ow:px-6 ow:py-8">
            <FilterPrice
              setOpenFilter={setOpenFilter}
              onSubmit={onSubmit}
              register={register}
              handleResetFilter={handleResetFilter}
              control={control}
            />
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
            <FilterItem setOpenFilter={setOpenFilterItems} control={control} onSubmit={onSubmit} />
          </PopoverContent>
        </Popover>
      </form>
    </section>
  );
}

function FilterPrice({
  setOpenFilter,
  onSubmit,
  register,
  handleResetFilter,
  control,
}: {
  setOpenFilter: (open: boolean) => void;
  onSubmit: () => void;
  register: UseFormRegister<FormValues>;
  handleResetFilter: () => void;
  control: Control<FormValues>;
}) {
  return (
    <div>
      <h3 className="mb-2 py-2 text-h5 text-text-100">Price:</h3>
      <div className="grid gap-1">
        <Controller
          name="minMaxPrice"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              {PRICE_FILTER.map((price, i) => (
                <button
                  type="button"
                  key={i}
                  className={classcat([
                    'w-max py-2 text-body2',
                    value === price.path ? 'text-primary' : 'text-text-50',
                  ])}
                  onClick={() => {
                    onChange(price.path);
                    setOpenFilter(false);
                    onSubmit();
                  }}
                >
                  {price.label}
                </button>
              ))}
            </>
          )}
        />
      </div>
      <div className="mt-2 flex py-2">
        <input
          {...register('minPrice')}
          type="text"
          className={classcat([inputClasses])}
          placeholder="$ Min"
        />
        <input
          {...register('maxPrice')}
          type="text"
          className={classcat([inputClasses])}
          placeholder="$ Max"
        />
        <Button
          className="btnmd h-10 px-0 ow:w-15 ow:rounded-lg"
          onClick={() => {
            setOpenFilter(false);
            onSubmit();
          }}
        >
          Go
        </Button>
      </div>
      <button
        className="mx-auto mt-6 block cursor-pointer text-center text-underline text-text-80 underline ow:border-none"
        onClick={handleResetFilter}
        type="button"
      >
        Clear filters
      </button>
    </div>
  );
}

function FilterItem({
  setOpenFilter,
  onSubmit,
  control,
}: {
  setOpenFilter: (open: boolean) => void;
  onSubmit: () => void;
  control: Control<FormValues>;
}) {
  return (
    <ul>
      <Controller
        control={control}
        name="sort"
        render={({ field: { onChange } }) => (
          <>
            {FILTER_ITEMS.map((item, i) => (
              <li
                key={i}
                className="cursor-pointer px-4.5 py-1 text-caption text-text-60 hover:bg-[#19CA9B]/[.21]"
                onClick={() => {
                  onChange(item.value);
                  setOpenFilter(false);
                  onSubmit();
                }}
              >
                {item.label}
              </li>
            ))}
          </>
        )}
      />
    </ul>
  );
}

const inputClasses = [
  'h-10 w-21 bg-black text-text-50 outline-none',
  'py-2 px-4 text-body1 placeholder:text-text-20',
  'rounded mr-1',
];
const buttonFilterClasses = [
  'ml-2 flex h-full items-center rounded-lg bg-secondary-200 px-3.5',
  'border border-solid border-text-10',
];
