//THIRD PARTY MODULES
import superjson from 'superjson';
import { createTRPCNext } from '@trpc/next';
import { type AppRouter } from '_@rpc/app.router';
import { createTRPCProxyClient, httpBatchLink, httpLink, loggerLink } from '@trpc/client';
//TYPES MODULES
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const api = createTRPCProxyClient<AppRouter>({
  transformer: superjson as any,
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `/api/trpc`,
      headers() {
        const session = localStorage.getItem('session');
        return {
          Authorization: session ? `Bearer ${session}` : '',
        };
      },
    }),
  ],
});

export const nextApi = createTRPCNext<AppRouter>({
  config() {
    return {
      // transformer: SuperJSON,
      /**
       * Links used to determine request flow from client to server.
       *
       * @see https://trpc.io/docs/links
       */
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      },
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpLink({
          url: `/api/trpc`,
          headers() {
            const session = localStorage.getItem('session');
            return {
              Authorization: session ? `Bearer ${session}` : '',
            };
          },
        }),
      ],
    };
  },
  ssr: false,
});

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
