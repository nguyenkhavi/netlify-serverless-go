//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb'
import { dbIndex, dbOS } from '_@landing/utils/constants'
import { ActivityType, ICollection, IPaging } from '_@landing/utils/type'
//RELATIVE MODULES
import { getTokenByAddress } from './token'
import { getAllActivitiesByCollectionAddress } from './activity'

export async function addCollection(db: IDBPDatabase, data: ICollection) {
  try {
    await db.add(dbOS.collection, data);
  } catch (e) {
    console.log('ignore duplicate data');
  }
}

export async function getTrendingCollectionsByCategory(
  db: IDBPDatabase,
  category: number,
  paging: IPaging,
) {
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
          total = current.price * current.quantity;
          return total;
        }, 0),
      };
    }),
  );
  return {
    data: collectionsWithVolume
      .sort((marketA, marketB) => {
        return marketB.volume - marketA.volume;
      })
      .slice(paging.page * paging.pageSize, (paging.page + 1) * paging.pageSize),
    total: collections.length,
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
