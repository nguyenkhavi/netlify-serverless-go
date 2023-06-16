//THIRD PARTY MODULES
import { getMarketDetailByListingId } from '_@landing/services';

type ReturnValue = ReturnType<typeof getMarketDetailByListingId>;
export type TypeMarketDetail = Awaited<ReturnValue>;
