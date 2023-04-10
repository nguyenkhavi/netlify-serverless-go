import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';

import { appRouter } from '_@rpc/app.router';
import { createContext } from '_@rpc/config/context';

const port = Number(process.env.PORT) || 3002;

createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext,
}).listen(port);

console.log(`Api Listening on http://localhost:${port}`);
