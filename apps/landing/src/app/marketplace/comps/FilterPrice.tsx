//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';

const MOCK_PRICE = [
  { label: 'Under $100', path: '100' },
  { label: '$100 to $500', path: '100-500' },
  { label: '$500 to $1000', path: '500-1000' },
  { label: '$1000 to $5000', path: '1000-5000' },
];

const inputClasses = [
  'h-10 w-21 bg-black text-text-50 outline-none',
  'py-2 px-4 text-base font-normal placeholder:text-text-30',
  'rounded mr-1',
];
export default function FilterPrice({ className = '' }: { className?: string }) {
  return (
    <div
      className={classcat([
        'bg-secondary-300 p-6',
        'mt-6 rounded-[15px] ring-1 ring-text-20 ring-offset-[-0.5px]',
        className,
      ])}
    >
      <h3 className="mb-4 mt-2 text-h5 text-text-100">Price:</h3>
      <div className="flex flex-col [&>button:not(:last-child)]:mb-4">
        {MOCK_PRICE.map((price, i) => (
          <button type="button" key={i} className="w-max text-body2 text-text-50">
            {price.label}
          </button>
        ))}
      </div>
      <div className="mt-2 flex py-2">
        <input type="text" className={classcat([inputClasses])} placeholder="$ Min" />
        <input type="text" className={classcat([inputClasses])} placeholder="$ Max" />
        <Button className="btnmd h-10 px-0 ow:rounded-lg">Go</Button>
      </div>
      <button className="mx-auto mt-8 block cursor-pointer text-center text-underline underline ow:border-none">
        Clear filters
      </button>
    </div>
  );
}
