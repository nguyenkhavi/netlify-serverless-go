'use client';
//THIRD PARTY MODULES
import { create } from 'zustand';
import { Magic } from 'magic-sdk';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import cookieHandler from '_@landing/utils/cookieHandler';
import { RouterInputs, RouterOutputs, nextApi } from '_@landing/utils/api';

type State = {
  user: RouterOutputs['myProfile'] | null;
};

type Action = {
  setUser: (user: RouterOutputs['myProfile'] | undefined) => void;
};

const useAuthStore = create<State & Action>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
}));

export default useAuthStore;

const { setUser } = useAuthStore.getState();
export const authStoreAction = {
  setUser,
};

export const useAuthStoreAction = () => {
  const router = useRouter();
  const [magicClient, setMagicClient] = useState<Magic | null>(null);

  const { mutateAsync: signUpFn } = nextApi.signup.useMutation({});
  const { mutateAsync: postSignUpFn } = nextApi.postSignup.useMutation({});
  const { mutateAsync: validateLoginFn } = nextApi.validateLogin.useMutation({});
  const { mutateAsync: loginFn } = nextApi.login.useMutation({});
  const { mutateAsync: logoutFn } = nextApi.logout.useMutation({});
  const { refetch } = nextApi.myProfile.useQuery(undefined, {});

  const _handleLogin = async (input: RouterInputs['validateLogin']) => {
    try {
      if (!magicClient) return;
      const found = await validateLoginFn(input);
      if (found) {
        await magicClient.auth.loginWithSMS({
          phoneNumber: `+${input.phone.phoneCode}${input.phone.phoneNumber}`,
        });
        const newDidToken = await magicClient.user.getIdToken({
          lifespan: 60 * 60 * 24 * 365, // 1 year
        });

        cookieHandler.set('session', newDidToken || '');
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
      await magicClient.auth.loginWithSMS({
        phoneNumber: `+${input.phone.phoneCode}${input.phone.phoneNumber}`,
      });

      const newDidToken = await magicClient.user.getIdToken({
        lifespan: 60 * 60 * 24 * 365, // 1 year
      });

      cookieHandler.set('session', newDidToken || '');

      if (newDidToken) {
        cookieHandler.set('session', newDidToken || '');
        const postRes = await postSignUpFn({
          didToken: newDidToken,
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
      cookieHandler.remove('session');
      router.push('/auth/sign-in');
    } catch (error: any) {
      console.log(`handleLogout error: ${error.message}`);
    } finally {
      setUser(undefined);
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
