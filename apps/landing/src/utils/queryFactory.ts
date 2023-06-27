//RELATIVE MODULES
import { IFilter, IPaging, ISorting, TItemCard } from './type';

export function queryItemFactory(data: TItemCard[], query: IPaging & ISorting & IFilter) {
  const { search, page, pageSize, price, releaseDate, minPrice, maxPrice } = query;
  const dataWithQuery = data
    .filter((item) => {
      if (search && !item.item.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (minPrice && maxPrice) {
        if (item.price < minPrice || item.price > maxPrice) return false;
      }
      if (minPrice && !maxPrice) {
        if (item.price < minPrice) return false;
      }
      if (!minPrice && maxPrice) {
        if (item.price > maxPrice) return false;
      }
      return true;
    })
    .sort((marketA, marketB) => {
      if (price == 'asc') {
        return marketA.price - marketB.price;
      } else if (price == 'desc') {
        return marketB.price - marketA.price;
      } else if (releaseDate == 'asc') {
        return marketA.startTime - marketB.startTime;
      } else if (releaseDate == 'desc') {
        return marketB.startTime - marketA.startTime;
      }
      return marketB.totalSale - marketA.totalSale;
    });

  return {
    data: dataWithQuery.slice(page * pageSize, (page + 1) * pageSize),
    total: dataWithQuery.length,
  };
}
