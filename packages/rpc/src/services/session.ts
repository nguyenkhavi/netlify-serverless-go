import { TRPCError } from '@trpc/server';
import { redisClient } from './redis';
import jwtDecode from 'jwt-decode';
export const pushSessionToWhiteList = (sessionId: string, userId: string, expiredAt: number) => {
  const now = new Date().getTime();
  const EX = Math.floor((expiredAt - now) / 1000);
  return redisClient.set(sessionId, userId, {
    EX,
  });
};

export const removeSessionFromWhiteList = (sessionId: string) => {
  return redisClient.del(sessionId);
};

export const isInWhiteList = (sessionId: string) => {
  return redisClient.get(sessionId);
};
type TDecoded = {
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  nbf: string;
  sid: string;
  sub: string;
};
export const decodeToken = (token?: string) => {
  if (!token) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return jwtDecode(token) as TDecoded;
};
