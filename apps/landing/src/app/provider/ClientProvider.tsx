'use client';
//THIRD PARTY MODULES
import { api } from '_@landing/utils/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnectV1,
  safeWallet,
} from '@thirdweb-dev/react';
//SHARED

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const UseClientProvider = api.withTRPC(({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}) as ({ children }: { children: React.ReactNode }) => JSX.Element;

// Create this Wrapper because of TS error
export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <UseClientProvider>{children}</UseClientProvider>;
}
