//THIRD PARTY MODULES
import { ReadonlyURLSearchParams } from 'next/navigation';

export default function handleFilterQueryString(
  searchParams: ReadonlyURLSearchParams,
  data: Record<any, any>,
) {
  const params = new URLSearchParams(searchParams);
  Object.keys(data).forEach((key) => {
    data[key] ? params.set(key, data[key]) : params.delete(key);
  });
  return params.toString();
}
