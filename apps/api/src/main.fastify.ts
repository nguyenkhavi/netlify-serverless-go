import {
  CreateFastifyContextOptions,
  fastifyTRPCPlugin,
} from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { inferAsyncReturnType } from '@trpc/server';
import cors from '@fastify/cors';
import { appRouter } from '_@rpc/app.router';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const user = { name: req.headers.username ?? 'anonymous' };
  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;

const server = fastify({ maxParamLength: 5000 });
server.register(cors, { origin: '*' });

// @ts-ignore
server.register(fastifyTRPCPlugin, {
  prefix: '/api',
  trpcOptions: { router: appRouter, createContext },
});

const initialize = async () => {
  await server.after();
  await server.ready();

  server.listen(
    { port: Number(process.env.PORT), host: '0.0.0.0' },
    (err, address) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }

      console.log(`Server is now listening on ${address}`);
    }
  );
};

initialize();
