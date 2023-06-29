//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { OPTIONS_FILTER, PRICE_FILTER } from '_@landing/utils/constants';
import { Control, Controller, UseFormRegister, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import BaseSelect from '_@shared/components/select/BaseSelect';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import GridIcon from '_@shared/icons/GridIcon';
import FilterIcon from '_@shared/icons/FilterIcon';
import ListViewIcon from '_@shared/icons/ListViewIcon';
//HOOK
import useFilterQueryString from '_@landing/hooks/useFilterQueryString';

const schema = z.object({
  sort: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minMaxPrice: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type RightOptionProps = {
  view: string;
};
export default function RightOption({ view }: RightOptionProps) {
  const filter = useFilterQueryString();
  const query = useSearchParams();

  const [openFilter, setOpenFilter] = useState(false);

  const { handleSubmit, register, control } = useForm<FormValues>({
    defaultValues: {
      sort: query.get('sort') || undefined,
      minPrice: query.get('minPrice') || '',
      maxPrice: query.get('maxPrice') || '',
      minMaxPrice: query.get('minMaxPrice') || '',
    },
  });

  const onSubmit = handleSubmit((value) => {
    if (value.minPrice || value.maxPrice) {
      value.minMaxPrice = undefined;
    }
    filter({ ...value, page: undefined });
  });

  const handleResetFilter = useCallback(() => {
    filter({
      minMaxPrice: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sort: undefined,
      page: undefined,
    });
  }, [filter]);

  const _handleChangeView = (view: string) => {
    filter({ view, page: undefined });
  };
  return (
    <form className="ml-auto flex items-center lg:mb-2">
      <Controller
        name="sort"
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <>
            <BaseSelect
              {...rest}
              onValueChange={(value) => {
                onChange(value);
                onSubmit();
              }}
              options={OPTIONS_FILTER}
              placeholder="Filters"
              owStyles={{
                triggerClasses:
                  'h-full ow:rounded w-auto min-w-[9.625rem] text-caption hidden lg:block ow:text-text-60',
                itemClasses: 'ow:py-2 ow:my-0 text-base ow:h-auto ow:text-text-50',
                contentClasses: 'ow:py-2',
              }}
            />
          </>
        )}
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
        <PopoverContent className={classcat(['ow:bg-black ow:px-3 ow:py-2'])}>
          <FilterContent
            setOpenFilter={setOpenFilter}
            control={control}
            onSubmit={onSubmit}
            register={register}
            handleResetFilter={handleResetFilter}
          />
        </PopoverContent>
      </Popover>
      <div
        className={classcat([
          'flex h-7.5 w-16 items-center justify-between rounded bg-secondary-200 px-2.25',
          'ml-2 lg:h-11 lg:w-30.75 lg:border lg:border-text-10 lg:px-7',
        ])}
      >
        <button onClick={() => _handleChangeView('list')} type="button">
          <ListViewIcon
            className="h-3.5 data-[active=true]:text-primary"
            data-active={view === 'list'}
          />
        </button>
        <button onClick={() => _handleChangeView('grid')} type="button">
          <GridIcon
            className="h-3.5 data-[active=true]:text-primary"
            data-active={view === 'grid'}
          />
        </button>
      </div>
    </form>
  );
}

const inputClasses = [
  'h-10 w-19.5 bg-secondary-300 text-text-20 outline-none',
  'px-4 text-body1 placeholder:text-text-20',
  'rounded mr-1',
];

type FilterContentProps = {
  setOpenFilter: (open: boolean) => void;
  onSubmit: () => void;
  handleResetFilter: () => void;
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
};
function FilterContent({
  setOpenFilter,
  onSubmit,
  register,
  handleResetFilter,
  control,
}: FilterContentProps) {
  return (
    <div>
      <h3 className="py-2 text-h5 text-text-100">Price:</h3>
      <div className="flex flex-col">
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
                    onSubmit();
                    setOpenFilter(false);
                  }}
                >
                  {price.label}
                </button>
              ))}
            </>
          )}
        />
      </div>
      <div className="flex py-2">
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
          className="btnmd h-10 px-0 ow:w-14.75 ow:rounded-lg"
          onClick={() => {
            onSubmit();
            setOpenFilter(false);
          }}
        >
          Go
        </Button>
      </div>
      <hr className="my-6 h-[.5px] w-full border-none bg-text-10" />
      <div className="flex flex-col">
        <Controller
          control={control}
          name="sort"
          render={({ field: { onChange, value } }) => (
            <>
              {OPTIONS_FILTER.map((sort, i) => (
                <button
                  type="button"
                  key={i}
                  className={classcat([
                    'w-max py-2 text-body2',
                    value === sort.value ? 'text-primary' : 'text-text-50',
                  ])}
                  onClick={() => {
                    onChange(sort.value);
                    onSubmit();
                    setOpenFilter(false);
                  }}
                >
                  {sort.label}
                </button>
              ))}
            </>
          )}
        />
      </div>
      <button
        className="mx-auto mt-6 block cursor-pointer text-center text-underline text-text-80 underline"
        onClick={handleResetFilter}
      >
        Clear filters
      </button>
    </div>
  );
}
