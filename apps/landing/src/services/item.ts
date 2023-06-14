//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { IItem } from '_@landing/utils/type';
import { dbIndex, dbOS } from '_@landing/utils/constants';

export async function addItem(db: IDBPDatabase, data: IItem) {
  try {
    await db.add(dbOS.items, data);
  } catch (e) {
    await db.put(dbOS.items, data);
  }
}

export async function getTrendingItemsByCategory(db: IDBPDatabase, category: number) {
  const market = await db.getAllFromIndex(dbOS.market, dbIndex.marketCategoryIndex, category);
  const buyRecords = await db.getAllFromIndex(dbOS.marketStatus, dbIndex.marketAvailableIndex, 1);
  const successMarket = market.filter((m) => {
    const buy = buyRecords.find((b) => b.listingId == m.listingId);
    if (buy) return true;
    return false;
  });
  return successMarket;
}

export async function updateItem(db: IDBPDatabase, data: IItem) {
  return db.put(dbOS.items, data);
}

export async function getItemById(db: IDBPDatabase, id: string): Promise<IItem> {
  return db.getFromIndex(dbOS.items, dbIndex.itemIdIndex, id);
}

export async function getAllItemByCollection(db: IDBPDatabase, address: string): Promise<IItem> {
  return db.getFromIndex(dbOS.items, dbIndex.itemAssetContractIndex, address);
}
