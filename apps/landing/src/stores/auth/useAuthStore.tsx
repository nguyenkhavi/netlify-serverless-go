'use client';
//THIRD PARTY MODULES
import { create } from 'zustand';
import { Magic } from 'magic-sdk';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RouterInputs, RouterOutputs, api, nextApi } from '_@landing/utils/api';

type State = {
  user: RouterOutputs['my-profile'] | null;
};

type Action = {
  setUser: (user: RouterOutputs['my-profile'] | undefined) => void;
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

  const { mutateAsync: signUpFn } = nextApi['signup'].useMutation({});
  const { mutateAsync: postSignUpFn } = nextApi['post-signup'].useMutation({});
  const { mutateAsync: validateLoginFn } = nextApi['validate-login'].useMutation({});
  const { mutateAsync: loginFn } = nextApi['login'].useMutation({});
  const { mutateAsync: logoutFn } = nextApi['logout'].useMutation({});

  const handleAfterLogin = async (didToken: string | null) => {
    if (!didToken) return;
    localStorage.setItem('session', didToken);
    const userProfile = await api['my-profile'].query();
    if (userProfile) {
      setUser(userProfile);
    }
  };

  const _handleLogin = async (input: RouterInputs['validate-login']) => {
    if (!magicClient) return;
    const found = await validateLoginFn(input);
    if (found) {
      const didToken = await magicClient.auth.loginWithSMS({
        phoneNumber: `+${input.phone.phoneCode}${input.phone.phoneNumber}`,
      });

      await handleAfterLogin(didToken);
      await loginFn();
      router.push('/profile');
    }
  };

  const _handleSignUp = async (input: RouterInputs['signup']) => {
    if (!magicClient) return;
    const requestId = await signUpFn(input);
    const didToken = await magicClient.auth.loginWithSMS({
      phoneNumber: `+${input.phone.phoneCode}${input.phone.phoneNumber}`,
    });

    if (didToken) {
      const postRes = await postSignUpFn({
        didToken,
        requestId,
      });
      if (postRes) {
        handleAfterLogin(didToken);
        router.push('/profile');
      }
    }
  };

  const _handleLogout = async () => {
    if (!magicClient) return;
    try {
      await magicClient.user.logout();
      await logoutFn();
      setUser(undefined);
    } finally {
      localStorage.setItem('token', '');
      router.push('/auth/sign-in');
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
