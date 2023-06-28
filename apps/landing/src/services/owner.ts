//THIRD PARTY MODULES
import Decimal from 'decimal.js';
import { IDBPDatabase } from 'idb';
import { ICollectionPercent, IItem, IUserPortfolio } from '_@landing/utils/type';
//RELATIVE MODULES
import { getCollectionByContract } from './collection';
import { getAllRawItemByCollection, getAllRawItemByOwner } from './item';
import { getAvailableMarketByCollection, getAvailableMarketByItem } from './market';
import {
  getAllActivitiesByCollectionAddress,
  getAllBuyActivities,
  getAllBuyActivitiesByCollectionAddress,
} from './activity';

export async function getUserPortfolio(db: IDBPDatabase, user: string): Promise<IUserPortfolio> {
  const rawItems = await getAllRawItemByOwner(db, user);
  const collectionSet = getDistinctCollections(rawItems);
  const collections = await Promise.all(
    collectionSet.map(async (collection) => {
      const market = await getAvailableMarketByCollection(db, collection);
      const sortedMarket = market.sort((a, b) => a.price - b.price);
      const activity = await getAllBuyActivitiesByCollectionAddress(db, collection);
      const sortedActivities = activity.sort((a, b) => b.blockNumber - a.blockNumber);
      const floorPrice = sortedMarket.length
        ? sortedMarket[0].price
        : sortedActivities.length
        ? sortedActivities[0].price
        : 0;
      const items = await getAllRawItemByCollection(db, collection);
      const collectionInfo = await getCollectionByContract(db, collection);
      return {
        ...collectionInfo,
        floorPrice: floorPrice,
        items,
        value: new Decimal(floorPrice).mul(items.length),
      };
    }),
  );
  const totalValue = collections.reduce((total, current) => {
    const totalValue = new Decimal(current.value).add(total).toNumber();
    return totalValue;
  }, 0);
  let total = new Decimal(0);
  const data = collections
    .map((collection, index) => {
      if (index >= 6) {
        return null;
      } else if (index == 5) {
        return {
          name: 'others',
          percent: new Decimal(100).sub(total).toFixed(2),
        };
      } else if (index == collections.length - 1) {
        return {
          name: collection.name,
          percent: new Decimal(100).sub(total).toFixed(2),
        };
      } else {
        const percent = new Decimal(collection.value).div(totalValue).mul(100);
        total = total.add(percent);
        return {
          name: collection.name,
          percent: percent.toFixed(2),
        };
      }
    })
    .filter((collection) => collection !== null) as ICollectionPercent[];
  return {
    data: data,
    total: totalValue,
  };
}

function getDistinctCollections(items: IItem[]): string[] {
  const addresses = items.map((item) => item.address);
  return [...new Set(addresses)];
}
