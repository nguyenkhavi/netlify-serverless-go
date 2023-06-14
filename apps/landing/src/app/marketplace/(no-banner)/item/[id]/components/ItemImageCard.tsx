//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';

function ItemImageCard() {
  return (
    <div className={classcat(['relative'])}>
      <img
        src="/images/marketplace/item-1.png"
        alt="image"
        className="w-full rounded-[theme(spacing[2.5])] object-contain"
      />
      <Button
        className={classcat([
          'absolute left-2 top-2 border-none bg-primary-shade-300 px-11.5 ow:w-fit ow:text-primary-700',
          'md:left-3 md:top-3',
        ])}
      >
        Arts
      </Button>
    </div>
  );
}

export default ItemImageCard;
