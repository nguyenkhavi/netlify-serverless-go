'use client';
//THIRD PARTY MODULES
import { IDBPDatabase, deleteDB, openDB } from 'idb';
import { dbIndex, dbOS } from '_@landing/utils/constants';
import { createContext, useContext, useEffect, useState } from 'react';
//RELATIVE MODULES
import { startEventListener } from '../listener';

type IndexedDBContextType = {
  db: IDBPDatabase | null;
};

export const IndexedDBContext = createContext<IndexedDBContextType>({} as IndexedDBContextType);

export const useIndexedDBContext = () => useContext(IndexedDBContext);

export default function IndexedDBProvider({ children }: { children: any }) {
  const [db, setDB] = useState<IDBPDatabase | null>(null);
  useEffect(() => {
    const connectDB = async () => {
      if (typeof window !== 'undefined' && 'indexedDB' in window) {
        // await deleteDB('Fleamint');
        const db = await openDB('Fleamint', 1, {
          upgrade(db) {
            // Create a store of objects
            if (!db.objectStoreNames.contains(dbOS.market)) {
              const market = db.createObjectStore(dbOS.market, {
                keyPath: 'listingId',
              });
              market.createIndex(dbIndex.marketCreatorIndex, 'listingCreator');
              market.createIndex(dbIndex.marketAssetContractIndex, 'assetContract');
              /// create a field = contract address + tokenId
              market.createIndex(dbIndex.marketItemIdIndex, 'itemId');
              market.createIndex(dbIndex.marketCategoryIndex, 'category');
              market.createIndex(dbIndex.marketListingIdIndex, 'listingId');
            }
            if (!db.objectStoreNames.contains(dbOS.marketStatus)) {
              const marketStatus = db.createObjectStore(dbOS.marketStatus, {
                keyPath: 'listingId',
              });
              marketStatus.createIndex(dbIndex.marketListingIdIndex, 'listingId');
              marketStatus.createIndex(dbIndex.marketAvailableIndex, 'isAvailable');
              marketStatus.createIndex(dbIndex.marketCanceledIndex, 'isCanceled');
              marketStatus.createIndex(dbIndex.marketSuccessIndex, 'isBought');
            }

            if (!db.objectStoreNames.contains(dbOS.collection)) {
              const collection = db.createObjectStore(dbOS.collection, {
                keyPath: 'address',
              });
              collection.createIndex(dbIndex.collectionCategoryIndex, 'category');
              collection.createIndex(dbIndex.collectionOwnerIndex, 'owner');
              collection.createIndex(dbIndex.collectionAddressIndex, 'address');
              collection.createIndex(dbIndex.collectionChainIndex, 'chain');
            }
            if (!db.objectStoreNames.contains(dbOS.activity)) {
              const activity = db.createObjectStore(dbOS.activity, {
                keyPath: ['transactionHash', 'type'],
              });
              activity.createIndex(dbIndex.activityTypeIndex, 'type');
              activity.createIndex(dbIndex.activityFromAddressIndex, 'fromAddress');
              activity.createIndex(dbIndex.activityToAddressIndex, 'toAddress');
              activity.createIndex(dbIndex.activityAssetContractIndex, 'assetContract');
              activity.createIndex(dbIndex.activityTokenIdIndex, 'tokenId');
              /// create a field = contract address + tokenId
              activity.createIndex(dbIndex.activityItemIdIndex, 'itemId');
            }
            if (!db.objectStoreNames.contains(dbOS.lastBlock)) {
              const lastBlock = db.createObjectStore(dbOS.lastBlock, {
                keyPath: ['id'],
              });
              lastBlock.createIndex(dbIndex.lastBlockIdIndex, 'id');
            }
            if (!db.objectStoreNames.contains(dbOS.items)) {
              const market = db.createObjectStore(dbOS.items, {
                keyPath: ['id'],
              });
              market.createIndex(dbIndex.itemOwnerIndex, 'owner');
              market.createIndex(dbIndex.itemAssetContractIndex, 'assetContract');
              market.createIndex(dbIndex.itemTokenIdIndex, 'tokenId');
              /// create a field = contract address +_+ tokenId
              market.createIndex(dbIndex.itemIdIndex, 'id');
            }
          },
        });
        startEventListener(db);
        // Open a transaction on the object store

        const market = await db.getAll(dbOS.items);
        console.log({ market });
        const lastBlock = await db.getAll(dbOS.lastBlock);
        console.log({ lastBlock });
        const collection = await db.getAll(dbOS.collection);
        console.log({ collection });

        setDB(db);
      }
    };

    connectDB();
  }, []);

  return <IndexedDBContext.Provider value={{ db }}>{children}</IndexedDBContext.Provider>;
}
