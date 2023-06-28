//THIRD PARTY MODULES
import classcat from 'classcat';
//SHARED
import CheckCircleIcon from '_@shared/icons/CheckCircleIcon';

export type TProjectValue = {
  id: number;
  image: string;
  name: string;
  token: string;
  price: string;
  date: string;
};
type Props = {
  value: TProjectValue;
};

export default function ProjectCard({ value }: Props) {
  return (
    <div className={classcat(['rounded-lg border border-secondary-400'])}>
      <div className="aspect-[3/2] overflow-hidden">
        <img src={value.image || ''} alt="" className="h-full w-full" />
      </div>
      <div className="mt-2 overflow-hidden pb-2 pl-4">
        <h3 className="text-subtitle2 xlg:text-h6" title={value.name}>
          {value.name}
          <CheckCircleIcon className="ml-2.5 inline-block h-3 w-3 text-primary xlg:h-4 xlg:w-4" />
        </h3>
        <ul className='grid gap-1'>
          <li className={classcat([itemClasses])}>
            <p>Tokens Offered:</p>
            <p>{value.token}</p>
          </li>
          <li className={classcat([itemClasses])}>
            <p>Sale Price:</p>
            <p>{value.price}</p>
          </li>
          <li className={classcat([itemClasses])}>
            <p>Start date:</p>
            <p>{value.date}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

const itemClasses = [
  'flex whitespace-nowrap [&>p:first-child]:mr-1',
  'text-caption xlg:text-body2 [&>p:first-child]:text-text-50',
];
