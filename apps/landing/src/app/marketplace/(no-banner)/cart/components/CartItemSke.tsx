import { SkeImage, SkeParagraph } from '_@landing/components/skeleton/skeleton';
import TrashCanIcon from '_@shared/icons/TrashCanIcon';

export default function CartItemSke() {
  return (
    <div className="rounded-[10px] border border-text-20 p-4 xlg:grid xlg:grid-cols-[200px_1fr_38px] xlg:gap-8">
      <div className="mx-auto overflow-hidden rounded-[10px] ring-1 ring-text-10 xlg:border-none h-50 w-50 xlg:h-51 xlg:w-51">
        <SkeImage className="h-full w-full object-cover" />
      </div>
      <div className="mt-4 grid h-max gap-1 text-center xlg:mt-0 xlg:text-left">
        <SkeParagraph />
      </div>
      <div className="mt-6 flex justify-center xlg:mt-0 xlg:items-center">
        <button className="grid h-9.5 w-9.5 place-items-center rounded-full bg-black hover:drop-shadow-btn">
          <TrashCanIcon className="text-text-30" />
        </button>
      </div>
    </div>
  );
}
