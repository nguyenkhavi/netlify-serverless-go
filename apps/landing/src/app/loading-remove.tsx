//THIRD PARTY MODULES
import classcat from 'classcat';

export default function Loading() {
  return (
    <div
      className={classcat([
        'fixed bottom-10 right-10 z-toast bg-primary text-black',
        'flex min-w-[15rem] items-center rounded-lg p-4',
      ])}
    >
      <div className="relative mr-3 h-5 w-5">
        <div className={classcat([ringClasses, 'animation-delay-[-0.45s]'])}></div>
        <div className={classcat([ringClasses, 'animation-delay-[-0.3s]'])}></div>
        <div className={classcat([ringClasses, 'animation-delay-[-0.15s]'])}></div>
      </div>
      Loading...
    </div>
  );
}

const ringClasses = [
  'absolute inset-0',
  'h-full w-full rounded-full border-2',
  'border-[black_transparent_transparent_transparent]',
  'animate-spin-ring ',
];
