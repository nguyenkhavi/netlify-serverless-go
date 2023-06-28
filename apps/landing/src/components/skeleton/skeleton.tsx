//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';

type SkeImageProps = { className?: string };
type SkeLineProps = { className?: string };
type SkeParaProps = { className?: string };
type SkeProfileProps = { className?: string };
type SkeCardProps = { className?: string; profile?: boolean; paragraph?: boolean };

export function SkeImage({ className }: SkeImageProps) {
  return (
    <div
      className={classcat([
        'flex w-full animate-pulse items-center justify-center',
        'h-40 rounded bg-gray-700',
        className,
      ])}
    >
      <svg
        className="h-12 w-12 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 640 512"
      >
        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
      </svg>
    </div>
  );
}

export function SkeLine({ className }: SkeLineProps) {
  return (
    <div
      className={classcat([
        'animate-pulse',
        'mb-4 h-2.5 w-full rounded-full bg-gray-700',
        className,
      ])}
    ></div>
  );
}

export function SkeParagraph({ className }: SkeParaProps) {
  return (
    <div className={className}>
      <div className="mb-2.5 h-2 animate-pulse rounded-full bg-gray-700"></div>
      <div className="mb-2.5 h-2 animate-pulse rounded-full bg-gray-700"></div>
      <div className="h-2 animate-pulse rounded-full bg-gray-700"></div>
    </div>
  );
}

export function SkeProfile({ className }: SkeProfileProps) {
  return (
    <div className={classcat(['mt-4 flex animate-pulse items-center space-x-3', className])}>
      <svg
        className="h-14 w-14 text-gray-700"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <div>
        <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-700"></div>
        <div className="h-2 w-48 rounded-full bg-gray-700"></div>
      </div>
    </div>
  );
}

export function SkeCard({ className, profile, paragraph }: SkeCardProps) {
  return (
    <div
      className={classcat(['animate-pulse rounded border border-gray-700 p-4 shadow', className])}
    >
      <div className="mb-4 flex h-48 items-center justify-center rounded bg-gray-700">
        <svg
          className="h-12 w-12 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
      </div>
      <Show when={paragraph}>
        <div className="mb-4 h-2.5 max-w-[theme.spacing(48)] rounded-full bg-gray-700"></div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-700"></div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-700"></div>
        <div className="h-2 rounded-full bg-gray-700"></div>
      </Show>
      <Show when={profile}>
        <div className="mt-4 flex items-center space-x-3">
          <svg
            className="h-14 w-14 text-gray-700"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div>
            <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-700"></div>
            <div className="h-2 w-48 rounded-full bg-gray-700"></div>
          </div>
        </div>
      </Show>
    </div>
  );
}
