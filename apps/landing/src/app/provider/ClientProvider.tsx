'use client';

//THIRD PARTY MODULES
import { nextApi } from '_@landing/utils/api';
//HOOK
import useGetCategoryStore from '_@landing/hooks/useGetCategoryStore';

const Provider = nextApi.withTRPC(({ children }: any) => {
  return children;
});

export default function ClientProvider({ children }: any) {
  useGetCategoryStore();

  // @ts-ignore
  return <Provider>{children}</Provider>;
}
