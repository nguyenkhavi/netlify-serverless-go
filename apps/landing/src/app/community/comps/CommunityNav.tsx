'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { cloneElement, useMemo } from 'react';
import { usePathname } from 'next/navigation';
//SHARED
import MailIcon from '_@shared/icons/MailIcon';
import HomeIcon from '_@shared/icons/HomeIcon';
import UserProfileIcon from '_@shared/icons/UserProfileIcon';

export default function CommunityNav() {
  const pathname = usePathname();

  const linkActive = useMemo(
    () => menuData.find((item) => pathname === item.path)?.label,
    [pathname],
  );

  return (
    <nav className="rounded-[10px] border border-text-10 bg-secondary-200 px-16 py-12">
      <ul className="grid gap-10">
        {menuData.map((menu, i) => (
          <li key={i}>
            <Link
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
  );
}

const menuData = [
  { label: 'Feed', path: '/community', icon: <HomeIcon /> },
  { label: 'Message', path: '/community/message', icon: <MailIcon /> },
  { label: 'Profile', path: '/community/profile', icon: <UserProfileIcon /> },
];
