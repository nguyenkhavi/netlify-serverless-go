//THIRD PARTY MODULES
import Link from 'next/link';

export type TSellerCard = {
  url: string;
  name: string;
  id: number;
};

export type SellerCardProps = {
  value: TSellerCard;
  view?: 'full' | 'box';
};

export default function SellerCard({ value, view, ...props }: SellerCardProps) {
  if (view === 'full') return <ViewFull value={value} {...props} />;
  return <ViewBox value={value} {...props} />;
}

function ViewFull({ value, ...props }: SellerCardProps) {
  return (
    <Link href={'/marketplace/creator/' + value.id} {...props}>
      <div className="aspect-square overflow-hidden rounded-[10px]">
        <img src={value.url} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="mt-2 text-h6 xlg:text-h4">{value.name}</p>
    </Link>
  );
}

function ViewBox({ value, ...props }: SellerCardProps) {
  return (
    <Link
      href={'/marketplace/creator/' + value.id}
      className="rounded-[10px] p-4 ring-1 ring-[#303030]"
      {...props}
    >
      <div className="aspect-[201/236] overflow-hidden rounded-[10px] ring-1 ring-text-20 ring-offset-[-0.5px]">
        <img src={value.url} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="mt-2 text-h5">@{value.name}</p>
    </Link>
  );
}
