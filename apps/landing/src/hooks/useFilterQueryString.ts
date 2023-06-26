//THIRD PARTY MODULES
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import handleFilterQueryString from '_@landing/utils/handleFilterQueryString';

export default function useFilterQueryString() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filter = useCallback(
    (data: Record<any, any>) => {
      router.push(pathname + '?' + handleFilterQueryString(searchParams, data));
    },
    [pathname, router, searchParams],
  );

  return filter;
}
