'use client';

//THIRD PARTY MODULES
import { PropsWithChildren } from 'react';
import { nextApi } from '_@landing/utils/api';
import cookieHandler from '_@landing/utils/cookieHandler';
//HOOK
import { GetMyProfileOnServer } from '_@landing/server/auth';

type Props = {
  user: GetMyProfileOnServer;
};

const AuthProvider = ({ children, user }: PropsWithChildren<Props>) => {
  nextApi.myProfile.useQuery(undefined, {
    enabled: !!cookieHandler.get('session'),
    initialData: (user?.status ? user.data : undefined) as any,
    staleTime: user?.status ? 30_000 : 0,
    refetchOnWindowFocus: false,
  });

  return <>{children}</>;
};

export default AuthProvider;
