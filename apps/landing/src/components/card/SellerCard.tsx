export type SellerCardProps = {
  url: string;
  name: string;
};
export default function SellerCard({ url, name, ...props }: SellerCardProps) {
  return (
    <div className="rounded-[10px] border border-[#303030] px-3 py-4 xlg:px-4 xlg:py-8" {...props}>
      <div className="aspect-[200/236] overflow-hidden rounded-[10px] border-[.5px] border-text-20">
        <img src={url} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="body-3 mt-1.25 xlg:mt-2 xlg:text-h5">@{name}</p>
    </div>
  );
}
