import { initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';

// export const createTRPCContext = async (opts: CreateFastifyContextOptions) => {
//   const { req, res } = opts

//   return {
//     req,
//     res,
//     ...createInnerTRPCContext(),
//     session: {} as any,
//   }
// }

const t = initTRPC.context().create({
  transformer: SuperJSON,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const mergeRouter = t.mergeRouters;
