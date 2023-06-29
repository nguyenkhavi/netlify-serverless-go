//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { IItem, IPaging } from '_@landing/utils/type';
import { dbIndex, dbOS } from '_@landing/utils/constants';
//RELATIVE MODULES
import { getTokenByAddress } from './token';
import { getAllActivitiesByItem } from './activity';
import { getCollectionByContract } from './collection';
import {
  getAllRawMarketsByItem,
  getAvailableMarketByItem,
  getMarketStatusByListingId,
} from './market';

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

export async function getAllRawItemByCollection(
  db: IDBPDatabase,
  address: string,
): Promise<IItem[]> {
  return db.getAllFromIndex(dbOS.items, dbIndex.itemAssetContractIndex, address);
}

export async function getAllRawItemByOwner(db: IDBPDatabase, owner: string): Promise<IItem[]> {
  return db.getAllFromIndex(dbOS.items, dbIndex.itemOwnerIndex, owner);
}

export async function getItemByOwner(db: IDBPDatabase, owner: string, paging: IPaging) {
  const items = await getAllRawItemByOwner(db, owner);
  const itemWithListing = await Promise.all(
    items.map(async (item) => {
      const listing = await getAvailableMarketByItem(db, item.id);
      return {
        ...item,
        market: listing,
      };
    }),
  );
  return {
    data: itemWithListing.slice(paging.page * paging.pageSize, (paging.page + 1) * paging.pageSize),
    total: items.length,
  };
}

export async function getItemDetailById(db: IDBPDatabase, id: string) {
  const item = await getItemById(db, id);
  const activities = await getAllActivitiesByItem(db, id);
  const collection = await getCollectionByContract(db, item.address);
  const market = await getAllRawMarketsByItem(db, id);
  const availableMarket = market.filter(async (mk) => {
    const status = await getMarketStatusByListingId(db, mk.listingId);
    return status.isAvailable == 1;
  });
  const marketDetail = availableMarket.map(async (mk) => {
    const token = await getTokenByAddress(mk.currency);
    return {
      ...mk,
      token,
    };
  });
  return {
    market: marketDetail,
    item,
    activities,
    collection,
  };
}
