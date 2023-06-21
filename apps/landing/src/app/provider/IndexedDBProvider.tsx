'use client';

//THIRD PARTY MODULES
import { Sepolia } from '@thirdweb-dev/chains';
import { getBestSeller } from '_@landing/services';
import { IDBPDatabase, deleteDB, openDB } from 'idb';
import { startEventListener } from '_@landing/listener';
import { dbIndex, dbOS } from '_@landing/utils/constants';
import { ICategory, TTopSeller } from '_@landing/utils/type';
import { insertSeedTokenData } from '_@landing/services/token';
import { createContext, useContext, useEffect, useState } from 'react';
import { getAllCategories, insertSeedCategoryData } from '_@landing/services/category';
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  safeWallet,
  walletConnectV1,
} from '@thirdweb-dev/react';

type TCategoryContext = { loading: boolean; data: ICategory[] };
type IndexedDBContextType = {
  db: IDBPDatabase | null;
  bestSeller: TTopSeller;
  category: TCategoryContext;
};

export const IndexedDBContext = createContext<IndexedDBContextType>({} as IndexedDBContextType);

export const useIndexedDBContext = () => useContext(IndexedDBContext);

export default function IndexedDBProvider({ children }: { children: React.ReactNode }) {
  const [db, setDB] = useState<IDBPDatabase | null>(null);
  const [bestSeller, setBestSeller] = useState<TTopSeller>([]);
  const [category, setCategory] = useState<TCategoryContext>({
    loading: true,
    data: [],
  });

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
            if (!db.objectStoreNames.contains(dbOS.category)) {
              const market = db.createObjectStore(dbOS.category, {
                keyPath: ['id'],
              });
              market.createIndex(dbIndex.categoryIdIndex, 'id');
            }
            if (!db.objectStoreNames.contains(dbOS.token)) {
              const market = db.createObjectStore(dbOS.token, {
                keyPath: ['address'],
              });
              market.createIndex(dbIndex.tokenAddressIndex, 'address');
              market.createIndex(dbIndex.tokenChainIndex, 'chain');
            }
          },
        });

        const seller = await getBestSeller(db);
        const category = await getAllCategories(db);
        if (!category.length) {
          insertSeedCategoryData(db);
          insertSeedTokenData(db);
        }
        startEventListener(db);

        // Open a transaction on the object store
        setDB(db);
        setCategory({
          loading: false,
          data: category,
        });
        setBestSeller(seller as TTopSeller);
      }
    };
    connectDB();
  }, []);

  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnectV1(), safeWallet()]}
    >
      <IndexedDBContext.Provider value={{ db, bestSeller, category }}>
        {children}
      </IndexedDBContext.Provider>
    </ThirdwebProvider>
  );
}
