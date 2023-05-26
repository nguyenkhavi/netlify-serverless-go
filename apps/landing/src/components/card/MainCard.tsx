//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import CartIcon from '_@shared/icons/CartIcon';

export type MainCardProps = {
  url: string;
  name: string;
  prices: string;
};
export default function MainCard({ url, name, prices, ...props }: MainCardProps) {
  return (
    <div className="rounded-[10px] border border-[#303030] px-4 py-4.5 xlg:py-5" {...props}>
      <div className="aspect-square overflow-hidden rounded-[10px] border-[.5px] border-text-20">
        <img src={url} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="body-3 mt-2 xlg:mt-4 xlg:text-body2">{name}</p>
      <span className="mt-1.5 text-caption text-text-80 xlg:mt-1.25 xlg:text-body3">{prices}</span>
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
