//THIRD PARTY MODULES
import Link from 'next/link';
import { useMemo } from 'react';
import { ITopSeller } from '_@landing/utils/type';
import { formatAddress } from '_@landing/utils/format';
import { RouterOutputs, nextApi } from '_@landing/utils/api';

export type SellerCardProps = {
  value: ITopSeller;
  view?: 'full' | 'box';
  owner?: RouterOutputs['myProfile']['profile'] | null;
};

export default function SellerCard({ value, view, ...props }: SellerCardProps) {
  const { data: dataUser } = nextApi.getUserByWallet.useQuery(
    { wallet: value.seller },
    { enabled: !!value.seller },
  );

  const owner = useMemo(() => {
    if (dataUser?.length && dataUser[0].username)
      return dataUser[0] as RouterOutputs['myProfile']['profile'];
    return null;
  }, [dataUser]);

  if (view === 'full') return <ViewFull value={value} owner={owner} {...props} />;
  return <ViewBox value={value} owner={owner} {...props} />;
}

function ViewFull({ value, owner, ...props }: SellerCardProps) {
  const fullName =
    [owner?.firstName, owner?.lastName].join(' ').trim() || formatAddress(value.seller);
  const avatar = owner?.avatarUrl || '/images/profile/avatar-default.webp';
  return (
    <Link href={'/marketplace/creator/' + value.seller} {...props}>
      <div className="aspect-square overflow-hidden rounded-[10px]">
        <img src={avatar} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="mt-2 text-h6 xlg:text-h4">{fullName}</p>
    </Link>
  );
}

function ViewBox({ value, owner, ...props }: SellerCardProps) {
  const fullName =
    [owner?.firstName, owner?.lastName].join(' ').trim() || formatAddress(value.seller);
  const avatar = owner?.avatarUrl || '/images/profile/avatar-default.webp';

  return (
    <Link
      href={'/marketplace/creator/' + value.seller}
      className="rounded-[10px] p-4 ring-1 ring-[#303030]"
      {...props}
    >
      <div className="aspect-[201/236] overflow-hidden rounded-[10px] ring-1 ring-text-20 ring-offset-[-0.5px]">
        <img src={avatar} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="mt-2 text-h5">@{fullName}</p>
    </Link>
  );
}
