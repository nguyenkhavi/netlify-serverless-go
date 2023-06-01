//THIRD PARTY MODULES
import { appRouter } from '_@rpc/app.router';
//HOOK
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: function (opts) {
      return opts;
    },
  });
};

export { handler as GET, handler as POST };
