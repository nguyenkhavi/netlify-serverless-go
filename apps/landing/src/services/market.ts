//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { MarketStatus } from '_@rpc/drizzle/enum';
import { dbIndex, dbOS } from '_@landing/utils/constants';
import {
  ActivityType,
  IActivity,
  IMarketData,
  IMarketStatusData,
  IPaging,
  ISorting,
} from '_@landing/utils/type';
//RELATIVE MODULES
import { getItemById } from './item';
import { getTokenByAddress } from './token';
import { getAllActivitiesByItem } from './activity';
import { getCollectionByContract } from './collection';
export async function addMarket(db: IDBPDatabase, data: IMarketData) {
  try {
    await db.add(dbOS.market, data);
  } catch (e) {
    console.log('ignore duplicate data');
  }
}

export async function getTrendingMarketByCategory(
  db: IDBPDatabase,
  category: number,
  paging: IPaging,
  sort?: ISorting,
) {
  const availableMarket = await getAllAvailableMarketByCategory(db, category);
  const markets = await Promise.all(
    availableMarket.map(async (mk) => {
      const activities = (await getAllActivitiesByItem(db, mk.itemId)).filter((activity) => {
        return activity.type == ActivityType.BUY;
      });
      const item = await getItemById(db, mk.itemId);
      return {
        ...mk,
        item,
        activities,
        totalSale: activities.length,
      };
    }),
  );
  return {
    data: markets
      .sort((marketA, marketB) => {
        return marketB.totalSale - marketA.totalSale;
      })
      .slice(paging.page * paging.pageSize, (paging.page + 1) * paging.pageSize),
    total: markets.length,
  };
}

export async function updateMarket(db: IDBPDatabase, data: IMarketStatusData) {
  await db.put(dbOS.marketStatus, data);
}

export async function getMarketByListingId(
  db: IDBPDatabase,
  listingId: number,
): Promise<IMarketData> {
  return db.getFromIndex(dbOS.market, dbIndex.marketListingIdIndex, listingId);
}

export async function getMarketsByCategory(db: IDBPDatabase, category: number) {
  return db.getAllFromIndex(dbOS.market, dbIndex.marketCategoryIndex, category);
}

export async function getAllAvailableMarketByCategory(
  db: IDBPDatabase,
  category: number,
): Promise<IMarketData[]> {
  const available: IMarketStatusData[] = await getAllAvailableMarket(db);
  const market = await Promise.all(
    available.map(async (mk) => {
      return getMarketByListingId(db, mk.listingId);
    }),
  );
  return market.filter((mk) => mk.category == category);
}

export async function getMarketsByCollection(db: IDBPDatabase, collection: string) {
  return db.getAllFromIndex(dbOS.market, dbIndex.marketAssetContractIndex, collection);
}

export async function getAllRawMarketsByItem(
  db: IDBPDatabase,
  itemId: string,
): Promise<IMarketData[]> {
  return db.getAllFromIndex(dbOS.market, dbIndex.marketItemIdIndex, itemId);
}

export async function getAvailableMarketByItem(db: IDBPDatabase, itemId: string) {
  const market = await getAllRawMarketsByItem(db, itemId);
  return market.filter(async (mk) => {
    const status = await getMarketStatusByListingId(db, mk.listingId);
    if (status.isAvailable == 1) {
      return true;
    }
    return false;
  });
}

export async function getAllAvailableMarket(db: IDBPDatabase): Promise<IMarketStatusData[]> {
  return db.getAllFromIndex(dbOS.marketStatus, dbIndex.marketAvailableIndex, 1);
}

export async function getMarketStatusByListingId(
  db: IDBPDatabase,
  listingId: number,
): Promise<IMarketStatusData> {
  return db.getFromIndex(dbOS.marketStatus, dbIndex.marketListingIdIndex, listingId);
}

export async function getMarketDetailByListingId(db: IDBPDatabase, listingId: number) {
  const market = await getMarketByListingId(db, listingId);
  const item = await getItemById(db, market.itemId);
  const activities = await getAllActivitiesByItem(db, market.itemId);
  const collection = await getCollectionByContract(db, market.assetContract);
  const token = await getTokenByAddress(db, market.currency);
  return {
    ...market,
    token,
    item,
    activities,
    collection,
  };
}
