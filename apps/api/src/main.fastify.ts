import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';

import cors from '@fastify/cors';
import { appRouter } from '_@rpc/app.router';
import { createTRPCContext } from '_@rpc/config/context';
import { redisClient } from '_@rpc/services/redis';
import { initSocket } from '_@rpc/services/socket/socket';

const server = fastify({ maxParamLength: 5000, logger: false });
server.register(cors, { origin: true, credentials: true });

server.register(fastifyTRPCPlugin, {
  prefix: '',
  trpcOptions: { router: appRouter, createContext: createTRPCContext },
});

initSocket(server.server);

const initialize = async () => {
  await server.after();
  await server.ready();
  await redisClient.connect();
  server.listen({ port: Number(process.env.PORT), host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.log('listen error: ', err);
      server.log.error(err);
      process.exit(1);
    }

    console.log(`Server is now listening on ${address}`);
  });
};

initialize();
