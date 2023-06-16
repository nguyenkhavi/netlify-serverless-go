//THIRD PARTY MODULES
import classcat from 'classcat';
import { nextApi } from '_@landing/utils/api';

function User({ wallet }: { wallet: string }) {
  const { data } = nextApi.getUserByWallet.useQuery({ wallet });

  return <p className={classcat(['text-body2 text-primary-700'])}>{data?.[0]?.username}</p>;
}

export default User;
