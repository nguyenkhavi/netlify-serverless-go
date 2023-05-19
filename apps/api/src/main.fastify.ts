import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';

import cors from '@fastify/cors';
// import { clerkPlugin } from '@clerk/fastify';
import { appRouter } from '_@rpc/app.router';
import { createTRPCContext } from '_@rpc/config/context';
import { Server } from 'socket.io';

const server = fastify({ maxParamLength: 5000, logger: false });
server.register(cors, { origin: true, credentials: true });
// server.register(clerkPlugin);

server.register(fastifyTRPCPlugin, {
  prefix: '',
  trpcOptions: { router: appRouter, createContext: createTRPCContext },
});

const io = new Server(3000);

io.on('connection', (socket) => {
  console.log('socket id', socket.id);
});

const initialize = async () => {
  await server.after();
  await server.ready();
  server.listen(
    { port: Number(process.env.PORT), host: '0.0.0.0' },
    (err, address) => {
      if (err) {
        console.log('listen error: ', err);
        server.log.error(err);
        process.exit(1);
      }

      console.log(`Server is now listening on ${address}`);
    }
  );
};

initialize();
