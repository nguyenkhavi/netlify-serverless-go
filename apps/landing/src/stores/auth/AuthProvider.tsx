'use client';
//THIRD PARTY MODULES
import { nextApi } from '_@landing/utils/api';
import { PropsWithChildren, useEffect } from 'react';
import cookieHandler from '_@landing/utils/cookieHandler';
import { authStoreAction } from '_@landing/stores/auth/useAuthStore';
//HOOK
import { GetMyProfileOnServer } from '_@landing/server/auth';

type Props = {
  user: GetMyProfileOnServer;
};

const AuthProvider = ({ children, user }: PropsWithChildren<Props>) => {
  const { data } = nextApi.myProfile.useQuery(undefined, {
    enabled: !!cookieHandler.get('session'),
    initialData: (user?.status ? user.data : undefined) as any,
    staleTime: user?.status ? 30_000 : 0,
  });

  useEffect(() => {
    if (!data) return;
    authStoreAction.setUser(data);
  }, [data]);

  return <>{children}</>;
};

export default AuthProvider;
