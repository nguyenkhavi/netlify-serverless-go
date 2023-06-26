'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { PRICE_FILTER } from '_@landing/utils/constants';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import { enterNumberOnly } from '_@shared/utils/checkNumberInputOnly';
//HOOK
import useFilterQueryString from '_@landing/hooks/useFilterQueryString';

const schema = z.object({
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minMaxPrice: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function FilterPrice({ className = '' }: { className?: string }) {
  const filter = useFilterQueryString();
  const query = useSearchParams();

  const { handleSubmit, register, control, setValue } = useForm<FormValues>({
    defaultValues: {
      minPrice: query.get('minPrice') || '',
      maxPrice: query.get('maxPrice') || '',
      minMaxPrice: query.get('minMaxPrice') || '',
    },
  });

  const _onSubmit = handleSubmit((value) => {
    if (value.minPrice || value.maxPrice) {
      value.minMaxPrice = '';
    }
    filter({ ...value, page: 1 });
  });

  const _handleReset = () => {
    filter({ minPrice: undefined, maxPrice: undefined, minMaxPrice: undefined });
  };

  return (
    <form
      onSubmit={_onSubmit}
      className={classcat([
        'bg-secondary-300 p-6',
        'mt-6 rounded-[15px] ring-1 ring-text-20 ring-offset-[-0.5px]',
        className,
      ])}
    >
      <h3 className="mb-4 mt-2 text-h5 text-text-100">Price:</h3>
      <div className="flex flex-col [&>button:not(:last-child)]:mb-4">
        <Controller
          name="minMaxPrice"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              {PRICE_FILTER.map((price, i) => (
                <button
                  key={i}
                  type="button"
                  className={classcat([
                    'w-max text-body2 hover:text-primary',
                    value === price.path ? 'text-primary' : 'text-text-50',
                  ])}
                  onClick={() => {
                    onChange(price.path);
                    setValue('minPrice', '');
                    setValue('maxPrice', '');
                    _onSubmit();
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
          onKeyDown={enterNumberOnly}
        />
        <input
          {...register('maxPrice')}
          type="text"
          className={classcat([inputClasses])}
          placeholder="$ Max"
          onKeyDown={enterNumberOnly}
        />
        <Button className="btnmd h-10 px-0 ow:rounded-lg" type="submit">
          Go
        </Button>
      </div>
      <button
        className="mx-auto mt-8 block cursor-pointer text-center text-underline underline ow:border-none"
        onClick={_handleReset}
        type="button"
      >
        Clear filters
      </button>
    </form>
  );
}

const inputClasses = [
  'h-10 w-21 bg-black text-text-50 outline-none',
  'py-2 px-4 text-base font-normal placeholder:text-text-30',
  'rounded mr-1',
];
