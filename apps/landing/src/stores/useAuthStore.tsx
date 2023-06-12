'use client';
//THIRD PARTY MODULES
import { create } from 'zustand';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Magic, MagicUserMetadata } from 'magic-sdk';

type State = {
  magicClient: Magic | null;
  user: MagicUserMetadata | null;
};

type Action = {
  setUser: (user: MagicUserMetadata | undefined) => void;
  loginWithSMS: (phoneNumber: string) => void;
  logout: () => void;
  setMagicClient: (magicClient: Magic) => void;
};

const useAuthStore = create<State & Action>((set, get) => ({
  magicClient: null,
  user: null,
  setMagicClient: (magicClient) => {
    set({ magicClient });
  },
  setUser: (user) => {
    set({ user });
  },
  loginWithSMS: async (phoneNumber) => {
    const { magicClient } = get();
    if (!magicClient) return;
    try {
      const session = await magicClient.auth.loginWithSMS({
        phoneNumber,
      });
      if (!session) return;
      handleCookie.set('session', `Bearer ${session}`);
      const user = await magicClient.user.getMetadata();
      set({ user });
      return session;
    } catch (error) {
      throw new Error(error as any);
    }
  },
  logout: async () => {
    const { magicClient } = get();
    if (!magicClient) return;
    try {
      const res = await magicClient.user.logout();
      set({ user: null });
      return res;
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useAuthStore;

const { setUser, setMagicClient } = useAuthStore.getState();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { magicClient } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const _magicClient = new Magic(
      process.env.NEXT_PUBLIC_MAGIC_LINK_PUBLISHABLE_API_KEY as string,
    );
    setMagicClient(_magicClient);
  }, []);

  useEffect(() => {
    if (!magicClient) return;
    magicClient.user
      .isLoggedIn()
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          magicClient.user.getMetadata().then((user) => {
            setUser(user);
          });
        }
      })
      .catch((error) => {
        console.log("You're not logged in", error);
        router.push('/auth/sign-in');
      });
  }, [magicClient, router]);

  return <>{children}</>;
};

export const useAuthStoreAction = () => {
  const { loginWithSMS: _loginWithSMS, logout: _logout } = useAuthStore();
  const router = useRouter();
  const loginWithSMS = async (phoneNumber: string) => {
    try {
      await _loginWithSMS(phoneNumber);
      router.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await _logout();
      router.push('/auth/sign-in');
      handleCookie.remove('session');
    } catch (error) {
      console.log(error);
    }
  };
  return { loginWithSMS, logout };
};

const handleCookie = {
  set: (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/`;
  },
  remove: (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  },
};
