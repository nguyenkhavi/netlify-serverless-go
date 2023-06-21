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
  const { refetch } = nextApi.myProfile.useQuery(undefined, {
    enabled: false,
  });

  const handleLogoutMagic = async () => {
    const isLoggedIn = await magicClient?.user.isLoggedIn();
    if (!isLoggedIn) return;
    await magicClient?.user.logout();
  };

  const _handleLogin = async (input: RouterInputs['validateLogin']) => {
    if (!magicClient) return;
    await handleLogoutMagic();
    const found = await validateLoginFn(input).catch(() => {
      throw new Error('User not found');
    });
    if (found) {
      const didToken = await magicClient.auth.loginWithSMS({
        phoneNumber: `+${input.phone.phoneCode}${input.phone.phoneNumber}`,
      });

      if (didToken) {
        const resp = await loginFn({
          didToken,
        });
        cookieHandler.set('session', resp.accessToken || '');
        const user = await refetch();
        setUser(user.data);
        router.push('/profile');
      }
    }
  };

  const _handleSignUp = async (input: RouterInputs['signup']) => {
    if (!magicClient) return;
    await handleLogoutMagic();
    const requestId = await signUpFn(input);
    const didToken = await magicClient.auth.loginWithSMS({
      phoneNumber: `+${input.phone.phoneCode}${input.phone.phoneNumber}`,
    });

    if (didToken) {
      const postRes = await postSignUpFn({
        didToken,
        requestId,
        username: input.username,
      });
      if (postRes) {
        const user = await refetch();
        setUser(user.data);
        cookieHandler.set('session', postRes.accessToken || '');
        router.push('/profile');
      }
    }
  };

  const _handleLogout = async () => {
    if (!magicClient) return;
    try {
      await magicClient.user.logout();
      await logoutFn();
      cookieHandler.remove('session');
      router.push('/auth/sign-in');
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
