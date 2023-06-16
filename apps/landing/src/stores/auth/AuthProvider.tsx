'use client';
//THIRD PARTY MODULES
import { useMemo } from 'react';
import { nextApi } from '_@landing/utils/api';
import { authStoreAction } from '_@landing/stores/auth/useAuthStore';
//HOOK
import { GetMyProfileOnServer } from '_@landing/server/auth';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children, user: data }: Props & { user: GetMyProfileOnServer }) => {
  nextApi.myProfile.useQuery(undefined, {
    enabled: data?.status,
    initialData: (data?.status ? data.data : {}) as any,
    staleTime: data?.status ? 10 * 60 * 1000 : 0,
  });

  useMemo(() => {
    if (data?.status) {
      authStoreAction.setUser(data.data as any);
    }
  }, [data]);

  return <>{children}</>;
};

export default AuthProvider;
