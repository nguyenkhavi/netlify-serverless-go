'use client';

//THIRD PARTY MODULES
import { PropsWithChildren } from 'react';
//HOOK
import { useGetFeedUser } from '_@landing/hooks/useGetFeedUser';
//RELATIVE MODULES
import CommunityNav from './comps/CommunityNav';

export default function CommunityLayout({ children }: PropsWithChildren) {
  const { client } = useGetFeedUser();

  if (!client) return null;

  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-10 pt-4 md:px-8 lg:grid-cols-[17.5rem_1fr] lg:px-15">
      <div className="hidden lg:block">
        <CommunityNav />
      </div>
      <div>{children}</div>
    </div>
  );
}
