//THIRD PARTY MODULES
import { IItemsStore } from '_@landing/utils/type';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';

type Props = {
  value: IItemsStore;
};

export default function MyItemCard({ value }: Props) {
  const { user } = useAuthStore();

  return (
    <div className="rounded-[10px] border border-[#303030] px-2.25 py-3.75 xlg:px-3.75 xlg:py-5">
      <div className="aspect-square overflow-hidden rounded-[10px] border-[.5px] border-white/[.13]">
        <img
          src={value.metadata.image ? value.metadata.image : '/images/marketplace/trending.png'}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-1.25 text-body3 xlg:mt-4 xlg:text-body2">{value.name}</p>
      <p
        className="overflow-hidden text-caption text-text-50 xlg:text-body3"
        title={user?.profile.username}
      >
        Creator: <span className="text-text-80">@{user?.profile.username}</span>
      </p>
      <hr className="my-1.25 h-[0.5px] border-none bg-text-10" />
      <div className="flex items-center justify-between text-caption text-text-70 xlg:text-body3">
        <span>{value.market.length > 0 ? 'Price' : 'Not Listed'}</span>
        <Show when={value.market.length > 0}>
          <span>{value.market[0].price}</span>
        </Show>
      </div>
    </div>
  );
}
