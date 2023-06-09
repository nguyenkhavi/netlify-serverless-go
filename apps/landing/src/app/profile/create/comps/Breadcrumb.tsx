//THIRD PARTY MODULES
import Link from 'next/link';
import { Fragment } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
//SHARED
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon';
import ArrowRightAltIcon from '_@shared/icons/ArrowRightAltIcon';

type Props = {
  paths: {
    name: string;
    href: string;
  }[];
} & React.ComponentProps<'div'>;

export default function Breadcrumb({ paths, className, ...props }: Props) {
  return (
    <div className={`flex items-center space-x-2 ${className}`} {...props}>
      <ArrowRightAltIcon className="h-6.5 w-6.5" />
      <div className="flex items-center">
        {paths.map((path, i) => (
          <Fragment key={i}>
            <Link href={path.href} className="btn-link">
              <span className="text-body3 text-text-50">{path.name}</span>
            </Link>
            <Show when={i < paths.length - 1}>
              <ArrowRightIcon className="h-5 w-4 text-primary-700/50" />
            </Show>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
