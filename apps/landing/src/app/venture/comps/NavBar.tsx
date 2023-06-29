'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      className={classcat([
        'grid grid-flow-col justify-start gap-13.75 px-[--px] py-6',
        'border-b-[0.5px] border-white/[.4]',
      ])}
    >
      {navData.map((item, i) => (
        <Link
          prefetch={false}
          href={item.href}
          key={i}
          className={classcat([
            'text-body2 text-text-60',
            'hover:text-gradient-pr',
            pathname === item.href && 'text-gradient-pr',
          ])}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

const navData = [
  { label: 'VC Home', href: '/venture' },
  { label: 'Get listed', href: '/venture/list' },
];
