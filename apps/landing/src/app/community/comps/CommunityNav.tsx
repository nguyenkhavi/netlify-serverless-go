'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { usePathname } from 'next/navigation';
import { cloneElement, useMemo } from 'react';
import HomeShortAdvVertical from '_@landing/app/comps/HomeShortAdvVertical';
//RELATIVE MODULES
import { menuData } from '../constants/constants';

export default function CommunityNav() {
  const pathname = usePathname();

  const linkActive = useMemo(
    () => menuData.find((item) => pathname === item.path)?.label,
    [pathname],
  );

  return (
    <>
      <nav className="mb-5 rounded-[10px] border border-text-10 bg-secondary-200 px-16 py-12">
        <ul className="grid gap-10">
          {menuData.map((menu, i) => (
            <li key={i}>
              <Link
                prefetch={false}
                href={menu.path}
                className={classcat([
                  'flex items-center hover:text-primary',
                  linkActive === menu.label ? 'text-primary' : 'text-text-50',
                ])}
              >
                {cloneElement(menu.icon, { color: 'currentColor', className: 'mr-1' })}
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <HomeShortAdvVertical />
    </>
  );
}
