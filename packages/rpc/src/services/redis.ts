import { createClient } from 'redis';

export const redisClient = createClient({
  password: process.env.REDIS_PW,
  socket: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
  },
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
