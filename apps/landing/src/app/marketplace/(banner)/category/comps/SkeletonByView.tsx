//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import { TViewMainCard } from '_@landing/components/card/MainCard';
import { SkeCard, SkeImage, SkeLine, SkeParagraph } from '_@landing/components/skeleton/skeleton';

export function SkeletonByView({ view }: { view: TViewMainCard }) {
  if (view === 'grid') {
    return (
      <>
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeCard
            key={index}
            className="[&>div:first-child]:aspect-square [&>div:first-child]:h-auto"
            paragraph
          />
        ))}
      </>
    );
  }
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={classcat([
            'rounded-[10px] p-4 ring-1 ring-text-20 ring-offset-[-0.5px]',
            'md:flex',
          ])}
        >
          <SkeImage className="mx-auto aspect-square h-50 ow:w-50 md:mr-8" />
          <div className="mt-4 grow md:mt-0">
            <SkeLine className="mx-auto ow:w-50 md:mx-0" />
            <SkeParagraph />
            <SkeParagraph className="mt-4" />
          </div>
        </div>
      ))}
    </>
  );
}
