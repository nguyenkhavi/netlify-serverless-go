'use client';
//THIRD PARTY MODULES
import { Magic } from 'magic-sdk';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import cookieHandler from '_@landing/utils/cookieHandler';
import { RouterInputs, RouterOutputs, nextApi } from '_@landing/utils/api';

const useAuthStore = () => {
  const utils = nextApi.useContext();
  const { data: user, refetch } = nextApi.myProfile.useQuery(undefined, {
    enabled: !!cookieHandler.get('session'),
    staleTime: 60 * 1000,
  });

  return {
    user,
    refetch,
    setUser: (user: RouterOutputs['myProfile'] | undefined) => {
      utils.myProfile.setData(undefined, user);
    },
  };
};

export default useAuthStore;

export const useAuthStoreAction = () => {
  const router = useRouter();
  const [magicClient, setMagicClient] = useState<Magic | null>(null);

  const { mutateAsync: signUpFn } = nextApi.signup.useMutation({});
  const { mutateAsync: postSignUpFn } = nextApi.postSignup.useMutation({});
  const { mutateAsync: validateLoginFn } = nextApi.validateLogin.useMutation({});
  const { mutateAsync: loginFn } = nextApi.login.useMutation({});
  const { mutateAsync: logoutFn } = nextApi.logout.useMutation({});
  const { refetch, setUser } = useAuthStore();

  const _handleLogin = async (input: RouterInputs['validateLogin']) => {
    try {
      if (!magicClient) return;
      const found = await validateLoginFn(input);
      if (found) {
        const didToken = await magicClient.auth.loginWithSMS({
          phoneNumber: `+${input.phone.phoneCode}${input.phone.phoneNumber}`,
        });

        cookieHandler.set('session', didToken || '');
        await loginFn();
        const user = await refetch();
        setUser(user.data);
        router.push('/profile');
      }
    } catch (error: any) {
      console.log(`handleLogin error: ${error.message}`);
    }
  };

  const _handleSignUp = async (input: RouterInputs['signup']) => {
    try {
      if (!magicClient) return;
      const requestId = await signUpFn(input);
      const didToken = await magicClient.auth.loginWithSMS({
        phoneNumber: `+${input.phone.phoneCode}${input.phone.phoneNumber}`,
      });

      if (didToken) {
        cookieHandler.set('session', didToken || '');
        const postRes = await postSignUpFn({
          didToken,
          requestId,
        });
        if (postRes) {
          const user = await refetch();
          setUser(user.data);
          router.push('/profile');
        }
      }
    } catch (error: any) {
      console.log(`handleSignUp error: ${error.message}`);
    }
  };

  const _handleLogout = async () => {
    if (!magicClient) return;
    try {
      await magicClient.user.logout();
      await logoutFn();
      setUser(undefined);
      cookieHandler.remove('session');
      router.push('/auth/sign-in');
    } catch (error: any) {
      console.log(`handleLogout error: ${error.message}`);
    }
  };

  useEffect(() => {
    const magicClient = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string);
    setMagicClient(magicClient);
  }, []);

  return {
    loginWithSMS: _handleLogin,
    logout: _handleLogout,
    signUp: _handleSignUp,
  };
};
