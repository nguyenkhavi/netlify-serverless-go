'use client';
//THIRD PARTY MODULES
import { Magic } from 'magic-sdk';
import { useEffect, useState } from 'react';
import { nextApi } from '_@landing/utils/api';
import { usePathname, useRouter } from 'next/navigation';
import { authStoreAction } from '_@landing/stores/auth/useAuthStore';

type Props = {
  children: React.ReactNode;
};

const loggedList = ['/auth'];
const authList = ['/profile'];

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogged, setIsLogged] = useState(false);
  nextApi['my-profile'].useQuery(undefined, {
    enabled: isLogged,
    onSuccess: (data) => {
      authStoreAction.setUser(data);
    },
  });

  useEffect(() => {
    const magicClient = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string);
    magicClient.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        setIsLogged(true);
      }

      if (isLoggedIn && loggedList.find((item) => pathname.includes(item))) {
        router.push(`/profile`);
      }
      if (!isLoggedIn && authList.find((item) => pathname.includes(item))) {
        router.push(`/auth/sign-in`);
      }
    });
  }, [pathname, router]);

  return <>{children}</>;
};

export default AuthProvider;
