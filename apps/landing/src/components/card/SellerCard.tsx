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
      <div className="aspect-square overflow-hidden rounded-[10px]  border-[.5px] border-text-30">
        <img src={value.url} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="body-6 mt-3.75 xlg:mt-4.25 xlg:text-h4">{value.name}</p>
    </Link>
  );
}

function ViewBox({ value, ...props }: SellerCardProps) {
  return (
    <Link
      href={'/marketplace/creator/' + value.id}
      className="rounded-[10px] border border-[#303030] px-3 py-4 xlg:px-4 xlg:py-8"
      {...props}
    >
      <div className="aspect-[200/236] overflow-hidden rounded-[10px] border-[.5px] border-text-20">
        <img src={value.url} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="body-3 mt-1.25 xlg:mt-2 xlg:text-h5">@{value.name}</p>
    </Link>
  );
}
