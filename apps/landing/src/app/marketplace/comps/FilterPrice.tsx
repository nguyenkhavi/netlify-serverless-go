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
  'h-7.5 w-17.5 bg-black text-text-50 outline-none',
  'py-[3px] px-3 text-btnmd placeholder:text-text-30',
  'rounded mr-2.5',
];
export default function FilterPrice() {
  return (
    <div
      className={classcat([
        'bg-secondary-300 px-6.25 py-7.5',
        'mt-5.25 rounded-[15px] border-[.5px] border-text-20',
      ])}
    >
      <h3 className="mb-1 text-h5 text-text-100">Price:</h3>
      <div className="flex flex-col [&>button:not(:last-child)]:mb-2">
        {MOCK_PRICE.map((price, i) => (
          <button type="button" key={i} className="w-max text-subtitle2 text-text-50">
            {price.label}
          </button>
        ))}
      </div>
      <div className="mt-3.75 flex">
        <input type="text" className={classcat([inputClasses])} placeholder="$ Min" />
        <input type="text" className={classcat([inputClasses])} placeholder="$ Max" />
        <Button className="btnmd h-7.5 px-0 ow:w-14.75 ow:rounded">Go</Button>
      </div>
      <button className="mx-auto mt-11 block cursor-pointer text-center text-underline underline">
        Clear filters
      </button>
    </div>
  );
}
