//THIRD PARTY MODULES
import classcat from 'classcat';
import { ICategory } from '_@landing/utils/type';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';

type Props = {
  name: string;
  image: string;
  category: ICategory;
};

function ItemImageCard({ image, name, category }: Props) {
  return (
    <div className={classcat(['relative'])}>
      <img
        src={image}
        alt={`Image of ${name}`}
        className="aspect-square w-full rounded-[theme(spacing[2.5])] object-cover md:aspect-auto md:h-126"
      />
      <Button
        className={classcat([
          'absolute left-2 top-2 border-none bg-primary-shade-300 ow:h-9 ow:w-26 ow:text-primary-700',
          'md:left-3 md:top-3 ow:md:h-11.25 ow:md:w-29.25 [&>span]:truncate',
        ])}
      >
        {category.name}
      </Button>
    </div>
  );
}

export default ItemImageCard;
