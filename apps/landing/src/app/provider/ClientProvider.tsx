'use client';

//THIRD PARTY MODULES
import { nextApi } from '_@landing/utils/api';

const Provider = nextApi.withTRPC(({ children }: any) => {
  return children;
});

export default function ClientProvider({ children }: any) {
  // @ts-ignore
  return <Provider>{children}</Provider>;
}
