'use client';
//THIRD PARTY MODULES
import { useEffect } from 'react';
import { nextApi } from '_@landing/utils/api';
import cookieHandler from '_@landing/utils/cookieHandler';
import { authStoreAction } from '_@landing/stores/auth/useAuthStore';
//HOOK
import { GetMyProfileOnServer } from '_@landing/server/auth';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children, user }: Props & { user: GetMyProfileOnServer }) => {
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
