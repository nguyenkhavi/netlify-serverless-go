//THIRD PARTY MODULES
import { useMemo } from 'react';
import { nextApi } from '_@landing/utils/api';
import { formatAddress } from '_@landing/utils/format';

export const useGetOwnerByWallet = (walletId: string) => {
  const { data: dataUser } = nextApi.getUserByWallet.useQuery(
    { wallet: walletId },
    { enabled: !!walletId },
  );

  const [owner, ownerData] = useMemo(() => {
    if (dataUser?.length && dataUser[0].username) return [dataUser[0].username, dataUser[0]];
    return [formatAddress(walletId), null];
  }, [dataUser, walletId]);

  return { owner, ownerData };
};
