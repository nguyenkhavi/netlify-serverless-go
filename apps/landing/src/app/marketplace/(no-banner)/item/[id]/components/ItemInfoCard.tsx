//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { handleAddToCart } from '_@landing/utils/NFTItem';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import ShareIcon from '_@shared/icons/ShareIcon';
import ImageArtIcon from '_@shared/icons/ImageArtIcon';
import { toastStore } from '_@shared/stores/toast/toastStore';
//RELATIVE MODULES
import Seller from './Seller';
import { TypeMarketDetail } from '../type';

type Props = {
  data: NonNullable<TypeMarketDetail>;
};

function ItemInfoCard({ data }: Props) {
  const { openToast } = toastStore();
  const { user } = useAuthStore();
  const buyNowLink = user ? '/marketplace/cart/checkout?item=' + data.listingId : '/auth/sign-in';
  return (
    <div className={classcat(['flex flex-col justify-between space-y-6'])}>
      <div className={classcat(['grid grow'])}>
        <div className={classcat(['grid grid-flow-row gap-4'])}>
          <div className={classcat(['grid grid-flow-row gap-2'])}>
            <h2 className={classcat(['truncate text-h3 text-primary-700', 'md:text-h2'])}>
              {data.item.name}
            </h2>
            <div className={classcat(['grid grid-flow-col items-center justify-start gap-3.5'])}>
              <p className={classcat(['text-body2 text-text-50', 'md:text-h6'])}>Price</p>
              <p className={classcat(['text-h5-bold text-primary-700', 'md:text-h4'])}>
                {data.price} {data.token.name}
              </p>
            </div>
            <div className={classcat(['grid grid-flow-col justify-start gap-2'])}>
              <Button
                className={classcat([
                  'btnmd w-max border-none bg-secondary-300 ow:rounded-[theme(spacing.5)]',
                  'ow:h-9 ow:w-fit ow:px-4.5 [&>svg]:h-4 [&>svg]:w-4',
                ])}
                leadingIcon={<ImageArtIcon />}
              >
                <span className="text-gradient-pr">{data.category?.name}</span>
              </Button>
              <Button
                className={classcat([
                  'btnmd w-max border-none bg-secondary-300 ow:rounded-[theme(spacing.5)]',
                  'ow:h-9 ow:w-20 [&>svg]:h-4 [&>svg]:w-4',
                ])}
                leadingIcon={<ShareIcon />}
              >
                <span className="text-gradient-pr">Share</span>
              </Button>
            </div>
          </div>
          <p className={classcat(['text-body1 text-text-50', 'md:line-clamp-5 md:text-h6'])}>
            {data.item.metadata.description}
          </p>
        </div>
      </div>
      <div className={classcat(['grid grid-flow-row gap-6'])}>
        <Seller address={data.item.owner} />
        <div className={classcat(['grid grid-flow-row gap-4', 'md:grid-flow-col'])}>
          <Button as={Link} href={buyNowLink} className={classcat(['btnlg'])}>
            Buy Now
          </Button>
          <Button
            className={classcat(['btnlg'])}
            variant="outlined"
            {...(!user
              ? { as: Link, href: '/auth/sign-in' }
              : { onClick: () => handleAddToCart(data, openToast) })}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ItemInfoCard;
