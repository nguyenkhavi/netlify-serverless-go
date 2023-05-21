//THIRD PARTY MODULES
import superjson from 'superjson';
import { createTRPCNext } from '@trpc/next';
import { httpBatchLink, loggerLink, createTRPCProxyClient } from '@trpc/client';
//TYPES MODULES
import type { AppRouter } from '_@rpc/app.router';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

// import type {} from '_@shared/../rpc/node_modules/@trpc/server/dist/';

const getBaseUrl = () => {
  // if (typeof window !== "undefined") return ""; // browser should use relative url
  // if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  if (process.env.NEXT_PUBLIC_TRPC_URL) return process.env.NEXT_PUBLIC_TRPC_URL; // SSR should use vercel url
  return `http://localhost:3002`; // dev SSR should use localhost
};

export const api = createTRPCProxyClient<AppRouter>({
  transformer: superjson,

  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

export const nextApi = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,

      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
    };
  },

  ssr: true,
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
