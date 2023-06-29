//THIRD PARTY MODULES
import Link from 'next/link';
import { TTopSeller } from '_@landing/utils/type';
import urlWithIpfs from '_@landing/utils/urlWithIpfs';
//HOOK
import { useGetOwnerByWallet } from '_@landing/hooks/useGetOwnerByWallet';

export type SellerCardProps = {
  value: TTopSeller[number];
  view?: 'full' | 'box';
  owner?: ReturnType<typeof useGetOwnerByWallet>['ownerData'];
  showName?: string;
};

export default function SellerCard({ value, view, ...props }: SellerCardProps) {
  const { owner, ownerData } = useGetOwnerByWallet(value.seller);

  if (view === 'full')
    return <ViewFull value={value} owner={ownerData} showName={owner} {...props} />;
  return <ViewBox value={value} owner={ownerData} showName={owner} {...props} />;
}

function ViewFull({ value, owner, showName, ...props }: SellerCardProps) {
  const avatar = urlWithIpfs(owner?.avatarUrl || '/images/profile/avatar-default.webp');
  return (
    <Link prefetch={false} href={'/marketplace/creator/' + value.seller} {...props}>
      <div className="aspect-square overflow-hidden rounded-[10px]">
        <img src={avatar} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="mt-2 text-h6 xlg:text-h4">{showName}</p>
    </Link>
  );
}

function ViewBox({ value, owner, showName, ...props }: SellerCardProps) {
  const avatar = urlWithIpfs(owner?.avatarUrl || '/images/profile/avatar-default.webp');

  return (
    <Link
      prefetch={false}
      href={'/marketplace/creator/' + value.seller}
      className="rounded-[10px] p-4 ring-1 ring-[#303030]"
      {...props}
    >
      <div className="aspect-[201/236] overflow-hidden rounded-[10px] ring-1 ring-text-20 ring-offset-[-0.5px]">
        <img src={avatar} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="mt-2 text-h5">@{showName}</p>
    </Link>
  );
}
