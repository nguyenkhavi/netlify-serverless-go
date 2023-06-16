'use client';
//THIRD PARTY MODULES
import { nextApi } from '_@landing/utils/api';
import cookieHandler from '_@landing/utils/cookieHandler';
//HOOK
import { GetMyProfileOnServer } from '_@landing/server/auth';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children, user }: Props & { user: GetMyProfileOnServer }) => {
  nextApi.myProfile.useQuery(undefined, {
    enabled: !!cookieHandler.get('session'),
    initialData: (user?.status ? user.data : undefined) as any,
    staleTime: user?.status ? 60 * 1000 : 0,
  });

  return <>{children}</>;
};

export default AuthProvider;
