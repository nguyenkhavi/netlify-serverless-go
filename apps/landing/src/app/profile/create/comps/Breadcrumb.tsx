//THIRD PARTY MODULES
import Link from 'next/link';
import { Fragment } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
//SHARED
import SlashIcon from '_@shared/icons/SlashIcon';
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon';

type Props = {
  paths: {
    name: string;
    href: string;
  }[];
} & React.ComponentProps<'div'>;

export default function Breadcrumb({ paths, className, ...props }: Props) {
  const backPath = paths?.[paths.length - 2];
  return (
    <div className={`flex items-center py-1 ${className}`} {...props}>
      <Show when={backPath}>
        <Link prefetch={false} href={backPath?.href || '#'} className="btn-link">
          <ArrowLeftIcon className="h-6 w-6 text-text-30" />
        </Link>
      </Show>
      <div className="flex items-center">
        {paths.map((path, i) => (
          <Fragment key={i}>
            <Link prefetch={false} href={path.href} className="px-2">
              <span className="btn-link text-body3 text-text-30">{path.name}</span>
            </Link>
            <Show when={i < paths.length - 1}>
              <SlashIcon className="mx-2 text-text-30" />
            </Show>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
