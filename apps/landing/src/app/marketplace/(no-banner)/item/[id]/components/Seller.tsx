//THIRD PARTY MODULES
import classcat from 'classcat';
import { nextApi } from '_@landing/utils/api';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import Switch from '_@shared/components/conditions/Switch';
//SHARED
import UserIcon from '_@shared/icons/UserIcon';
import CheckIcon from '_@shared/icons/CheckIcon';
import StoreIcon from '_@shared/icons/StoreIcon';

type Props = {
  address: string;
};

function Seller({ address }: Props) {
  const { data } = nextApi.getUserByWallet.useQuery({ wallet: address });
  return (
    <div className={classcat(['grid grid-flow-row gap-3'])}>
      <p className={classcat(['text-h6 text-primary-700'])}>Seller</p>
      <div className={classcat(['grid grid-flow-col justify-between space-x-2'])}>
        <div className={classcat(['grid grid-flow-col items-center gap-2 md:gap-4'])}>
          <div className="relative flex h-12.5 w-12.5 items-center justify-center md:h-15 md:w-15">
            <Switch.Root>
              <Switch.Case when={!!data?.[0]?.avatarUrl}>
                <img
                  className="h-12.5 w-12.5 rounded-full object-cover md:h-15 md:w-15"
                  src={data?.[0]?.avatarUrl ?? ''}
                  alt={`avatar of ${data?.[0]?.avatarUrl}`}
                />
              </Switch.Case>
              <Switch.Case when={true}>
                <UserIcon className="h-12.5 w-12.5 rounded-full md:h-12.5 md:w-12.5" />
              </Switch.Case>
            </Switch.Root>

            <div className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
              <CheckIcon className={classcat(['h-3 w-3 text-secondary'])} />
            </div>
          </div>
          <p className={classcat(['truncate text-body2', 'md:text-body1'])}>
            {data?.[0]?.username}
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
  );
}

export default Seller;
