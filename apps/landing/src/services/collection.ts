//THIRD PARTY MODULES
import Decimal from 'decimal.js';
import { IDBPDatabase } from 'idb';
import { dbIndex, dbOS } from '_@landing/utils/constants';
import { IFilter, IMarketData, ISorting } from '_@landing/utils/type';
import { ActivityType, ICollection, IPaging } from '_@landing/utils/type';
//RELATIVE MODULES
import { getItemById } from './item';
import { getAllActivitiesByCollectionAddress } from './activity';

export async function addCollection(db: IDBPDatabase, data: ICollection) {
  try {
    await db.add(dbOS.collection, data);
  } catch (e) {
    console.log('collection ignore duplicate data', { data });
  }
}

export async function getTrendingCollectionsByCategory(
  db: IDBPDatabase,
  category: number,
  query: IPaging & ISorting & IFilter,
) {
  const { search, page, pageSize, price, minPrice, maxPrice } = query;

  const collections = await getAllRawCollectionByCategory(db, category);
  const collectionsWithVolume = await Promise.all(
    collections.map(async (collection) => {
      const activities = (await getAllActivitiesByCollectionAddress(db, collection.address)).filter(
        (activity) => {
          return activity.type == ActivityType.BUY;
        },
      );
      return {
        ...collection,
        activities,
        totalSale: activities.length,
        volume: activities.reduce((total, current) => {
          total = new Decimal(current.price).mul(current.quantity).add(total).toNumber();
          return total;
        }, 0),
      };
    }),
  );

  const collectionWithQuery = collectionsWithVolume
    .filter((item) => {
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (minPrice && maxPrice) {
        if (item.volume < minPrice || item.volume > maxPrice) return false;
      }
      if (minPrice && !maxPrice) {
        if (item.volume < minPrice) return false;
      }
      if (!minPrice && maxPrice) {
        if (item.volume > maxPrice) return false;
      }
      return true;
    })
    .sort((marketA, marketB) => {
      if (price == 'asc') {
        return marketA.volume - marketB.volume;
      } else return marketB.volume - marketA.volume;
    });
  return {
    data: collectionWithQuery.slice(page * pageSize, (page + 1) * pageSize),
    total: collectionWithQuery.length,
  };
}

export async function getCollectionByContract(
  db: IDBPDatabase,
  contract: string,
): Promise<ICollection> {
  return db.getFromIndex(dbOS.collection, dbIndex.collectionAddressIndex, contract);
}

export async function getAllCollectionByChain(
  db: IDBPDatabase,
  chain: string,
): Promise<ICollection[]> {
  return db.getAllFromIndex(dbOS.collection, dbIndex.collectionChainIndex, chain);
}

export async function batchAddCollection(db: IDBPDatabase, data: ICollection[]) {
  return db.add(dbOS.collection, data);
}

export async function getAllCollections(db: IDBPDatabase): Promise<ICollection[]> {
  return db.getAll(dbOS.collection);
}
export async function getCollectionsByOwner(db: IDBPDatabase, owner: string, paging: IPaging) {
  const collections: ICollection[] = await db.getAllFromIndex(
    dbOS.collection,
    dbIndex.collectionOwnerIndex,
    owner,
  );
  const collectionWithVolume = await Promise.all(
    collections.map(async (collection) => {
      const activities = (await getAllActivitiesByCollectionAddress(db, collection.address)).filter(
        (activity) => {
          return activity.type == ActivityType.BUY;
        },
      );
      return {
        ...collection,
        volume: activities.reduce((total, current) => {
          total += current.price * current.quantity;
          return total;
        }, 0),
      };
    }),
  );

  return {
    data: collectionWithVolume
      .sort((collectionA, collectionB) => {
        return collectionA.volume - collectionB.volume;
      })
      .slice(paging.page * paging.pageSize, (paging.page + 1) * paging.pageSize),
    total: collections.length,
  };
}

export async function getAllRawCollectionByCategory(
  db: IDBPDatabase,
  category: number,
): Promise<ICollection[]> {
  return db.getAllFromIndex(dbOS.collection, dbIndex.collectionCategoryIndex, category);
}

export async function getAllRawCollectionByOwner(
  db: IDBPDatabase,
  owner: string,
): Promise<ICollection[]> {
  return db.getAllFromIndex(dbOS.collection, dbIndex.collectionOwnerIndex, owner);
}

export async function getDetailCollectionByAddress(
  db: IDBPDatabase,
  address: string,
): Promise<{
  collection: ICollection;
  summary: {
    volume: number;
    NFTs: number;
    totalOwner: number;
  };
}> {
  const collection = await db.getFromIndex(
    dbOS.collection,
    dbIndex.collectionAddressIndex,
    address,
  );
  const items: IMarketData[] = await db.getAll(dbOS.market);
  const itemByCollection = (
    await Promise.all(
      items.map(async (mk) => {
        const item = await getItemById(db, mk.itemId);
        return {
          ...mk,
          item,
        };
      }),
    )
  ).filter((item) => item.item.address === address);

  const summaryData = itemByCollection.reduce(
    (prevVal, curVal) => {
      const price = new Decimal(curVal.price * curVal.quantity);

      return {
        volume: price.add(prevVal.volume).toNumber(),
        uniqueOwner: [...prevVal.uniqueOwner, curVal.listingCreator],
      };
    },
    { volume: 0, uniqueOwner: [] } as { volume: number; uniqueOwner: string[] },
  );

  return {
    collection,
    summary: {
      volume: summaryData.volume,
      NFTs: itemByCollection.length,
      totalOwner: [...new Set(summaryData.uniqueOwner)].length,
    },
  };
}
