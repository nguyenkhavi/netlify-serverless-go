//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import CheckIcon from '_@shared/icons/CheckIcon';
import ShareIcon from '_@shared/icons/ShareIcon';
import StoreIcon from '_@shared/icons/StoreIcon';
import ImageArtIcon from '_@shared/icons/ImageArtIcon';

function ItemDescriptionCard() {
  return (
    <div className={classcat(['flex flex-col justify-between space-y-6'])}>
      <div className={classcat(['grid grid-flow-row gap-4'])}>
        <div className={classcat(['grid grid-flow-row gap-2'])}>
          <h2 className={classcat(['truncate text-h3 text-primary-700', 'md:text-h2'])}>
            {mockData.name}
          </h2>
          <div className={classcat(['grid grid-flow-col items-center justify-start gap-3.5'])}>
            <p className={classcat(['text-body2 text-text-50', 'md:text-h6'])}>Price</p>
            <p className={classcat(['text-h5-bold text-primary-700', 'md:text-h4'])}>
              {mockData.price}
            </p>
          </div>
          <div className={classcat(['grid grid-flow-col justify-start gap-2'])}>
            <Button
              className={classcat([
                'btnmd w-max border-none bg-secondary-300 ow:rounded-[theme(spacing.5)]',
                'ow:h-9 ow:w-20 [&>svg]:h-4 [&>svg]:w-4',
              ])}
              leadingIcon={<ImageArtIcon />}
            >
              <span className="text-gradient-pr">{mockData.category}</span>
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
        <p className={classcat(['text-body1 text-text-50', 'md:text-h6'])}>
          {mockData.description}
        </p>
      </div>
      <div className={classcat(['grid grid-flow-row gap-6'])}>
        <div className={classcat(['grid grid-flow-row gap-3'])}>
          <p className={classcat(['text-h6 text-primary-700'])}>Seller</p>
          <div className={classcat(['grid grid-flow-col justify-between space-x-2'])}>
            <div className={classcat(['grid grid-flow-col items-center gap-2 md:gap-4'])}>
              <div className="relative">
                <img
                  className="h-12.5 w-12.5 rounded-full object-cover md:h-15 md:w-15"
                  src={mockData.seller.avtUrl}
                  alt={`avatar of ${mockData.seller.name}`}
                />
                <div className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                  <CheckIcon className={classcat(['h-3 w-3 text-secondary'])} />
                </div>
              </div>
              <p className={classcat(['truncate text-body2', 'md:text-body1'])}>
                {mockData.seller.name}
              </p>
            </div>
            <Button
              className={classcat(['ow:w-fit ow:px-3 [&>svg]:hover:text-secondary'])}
              variant="outlined"
              leadingIcon={<StoreIcon />}
            >
              Visit Store
            </Button>
          </div>
        </div>
        <div className={classcat(['grid grid-flow-row gap-4', 'md:grid-flow-col'])}>
          <Button className={classcat(['btnlg'])}>Buy Now</Button>
          <Button className={classcat(['btnlg'])} variant="outlined">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ItemDescriptionCard;

const mockData = {
  name: '3DClass_Art',
  price: '$1423.4',
  category: 'Art',
  description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
  laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
  architecto beatae vitae dicta sunt explicabo.`,
  seller: {
    avtUrl:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    name: '@Loicy_kevin',
    storeId: '123',
  },
};
