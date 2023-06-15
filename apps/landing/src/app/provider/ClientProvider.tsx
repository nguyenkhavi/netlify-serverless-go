'use client';

//THIRD PARTY MODULES
import { nextApi } from '_@landing/utils/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const Provider = nextApi.withTRPC(({ children }: any) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
});

export default function ClientProvider({ children }: any) {
  // @ts-ignore
  return <Provider>{children}</Provider>;
}
