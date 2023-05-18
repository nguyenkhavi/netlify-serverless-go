'use client';
//THIRD PARTY MODULES
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { api } from '_@landing/utils/api';
//SHARED

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const UseClientProvider = api.withTRPC(({ children }: { children: any }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
});

// Create this Wrapper becase of TS error
export default function Wrapper({ children }: { children: any }) {
  // @ts-ignore
  return <UseClientProvider>{children}</UseClientProvider>;
}
