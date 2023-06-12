//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { dbIndex, dbOS } from '_@landing/utils/constants';
import { IMarketData, IMarketStatusData } from '_@landing/utils/type';
export async function addMarket(db: IDBPDatabase, data: IMarketData) {
  try {
    await db.add(dbOS.market, data);
  } catch (e) {
    console.log('ignore duplicate data');
  }
}

export async function updateMarket(db: IDBPDatabase, data: IMarketStatusData) {
  await db.put(dbOS.marketStatus, data);
}

export async function getMarketByListingId(db: IDBPDatabase, listingId: number) {
  return db.getFromIndex(dbOS.market, dbIndex.marketListingIdIndex, listingId);
}

export async function getMarketsByCategory(db: IDBPDatabase, category: number) {
  return db.getAllFromIndex(dbOS.market, dbIndex.marketCategoryIndex, category);
}

export async function getMarketsByCollection(db: IDBPDatabase, collection: string) {
  return db.getAllFromIndex(dbOS.market, dbIndex.marketAssetContractIndex, collection);
}

export async function getMarketsByItem(db: IDBPDatabase, itemId: string) {
  return db.getAllFromIndex(dbOS.market, dbIndex.marketItemIdIndex, itemId);
}

export async function getMarketStatusByListingId(db: IDBPDatabase, listingId: number) {
  return db.getFromIndex(dbOS.marketStatus, dbIndex.marketListingIdIndex, listingId);
}
