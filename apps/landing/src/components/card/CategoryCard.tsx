export type CategoryCard = {
  url: string;
  name: string;
};

export type CategoryCardProps = {
  value: CategoryCard;
};

export default function CategoryCard({ value, ...props }: CategoryCardProps) {
  return (
    <div {...props}>
      <div className="aspect-square overflow-hidden rounded-[10px]  border-[.5px] border-text-30">
        <img src={value.url} alt="image" className="h-full w-full object-cover" />
      </div>
      <p className="body-6 mt-3.75 xlg:mt-4.25 xlg:text-h4">{value.name}</p>
    </div>
  );
}
