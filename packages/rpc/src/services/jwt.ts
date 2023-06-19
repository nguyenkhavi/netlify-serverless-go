import { TRPCError } from '@trpc/server';
import { session } from '_@rpc/drizzle/session';
import { db } from '_@rpc/services/drizzle';
import { eq, gt } from 'drizzle-orm';
import * as jwt from 'jsonwebtoken';
type TAccessPayload = {
  userId: string;
};

export const generateAccessToken = (payload: TAccessPayload) => {
  const secret = process.env.JWT_ACCESS_SECRET || '';
  const accessToken = jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || '',
  });
  const decoded = jwt.decode(accessToken) as TAccessPayload & jwt.JwtPayload;
  return { accessToken, ext: decoded.exp };
};

export const verifyAccessToken = async (token: string) => {
  const secret = process.env.JWT_ACCESS_SECRET || '';
  const payload = jwt.verify(token, secret) as TAccessPayload & jwt.JwtPayload;
  const nowSeconds = Math.ceil(new Date().getTime() / 1000);

  const sessions = await db
    .select()
    .from(session)
    .where(eq(session.token, token))
    .where(gt(session.ext, nowSeconds))
    .limit(1)
    .execute();
  if (!sessions.length) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return payload.userId;
};
