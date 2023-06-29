//THIRD PARTY MODULES
import Link from 'next/link';
import { ICategory } from '_@landing/utils/type';

export type CategoryCardProps = {
  value: ICategory;
} & React.HTMLAttributes<HTMLAnchorElement>;

export default function CategoryCard({ value, ...props }: CategoryCardProps) {
  return (
    <Link prefetch={false} href={`/marketplace/category/${value.id}`} {...props}>
      <div className="aspect-square overflow-hidden rounded-[10px]">
        <img
          src={process.env.NEXT_PUBLIC_IPFS_GATE_WAY + value.image}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-2 text-h6 xlg:text-h4">{value.name}</p>
    </Link>
  );
}
