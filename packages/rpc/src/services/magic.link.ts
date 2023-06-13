import { Magic } from '@magic-sdk/admin';
import { TRPCError } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export const magicAdmin = new Magic(process.env.MAGIC_SECRET_KEY || '');

export const authenticateRequest = async (req: FetchCreateContextFnOptions['req']) => {
  const authorization = req.headers.get('authorization');
  if (!authorization) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  try {
    const token = magicAdmin.utils.parseAuthorizationHeader(authorization);
    magicAdmin.token.validate(token);
    const metadata = await magicAdmin.users.getMetadataByToken(token);
    return { metadata, token };
  } catch (e) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
};
