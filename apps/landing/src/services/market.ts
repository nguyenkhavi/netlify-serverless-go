//THIRD PARTY MODULES
import Decimal from 'decimal.js';
import { IDBPDatabase } from 'idb';
import { Chains, dbIndex, dbOS } from '_@landing/utils/constants';
import {
  ActivityType,
  IMarketData,
  IMarketStatusData,
  IPaging,
  ISorting,
} from '_@landing/utils/type';
//RELATIVE MODULES
import { getItemById } from './item';
import { getTokenByAddress } from './token';
import { getCategoryById } from './category';
import { getCollectionByContract } from './collection';
import { getAllActivitiesByItem, getAllBuyActivities } from './activity';
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
      const token = await getTokenByAddress(db, mk.currency);
      const item = await getItemById(db, mk.itemId);
      return {
        ...mk,
        item,
        activities,
        token,
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
  const availableMarket = market.filter(async (mk) => {
    const status = await getMarketStatusByListingId(db, mk.listingId);
    if (status.isAvailable == 1) {
      return true;
    }
    return false;
  });
  return Promise.all(
    availableMarket.map(async (mk) => {
      const token = await getTokenByAddress(db, mk.currency);
      return {
        ...mk,
        token,
      };
    }),
  );
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
  const category = await getCategoryById(db, collection.category);
  const token = await getTokenByAddress(db, market.currency);
  const chain = Object.values(Chains)
    .map((chain) => chain)
    .find((chain) => chain.chainId === item.chain);

  return {
    ...market,
    token,
    item,
    activities,
    collection,
    category,
    chain,
  };
}

export async function getBestSeller(db: IDBPDatabase) {
  const activities = await getAllBuyActivities(db);
  const sellers: { [key: string]: number } = activities.reduce(
    (sellers: { [key: string]: number }, activity) => {
      const { toAddress, price, quantity } = activity;
      const totalPrice = new Decimal(price).mul(quantity).toNumber();

      // eslint-disable-next-line no-prototype-builtins
      if (!sellers.hasOwnProperty(toAddress)) {
        sellers[toAddress] = totalPrice;
      } else {
        sellers[toAddress] += totalPrice;
      }

      return sellers;
    },
    {},
  );
  return Object.keys(sellers)
    .map((seller) => {
      return {
        seller: seller,
        volume: sellers[seller],
      };
    })
    .sort((a, b) => {
      return b.volume - a.volume;
    });
}
