'use client';

//THIRD PARTY MODULES
import { IDBPDatabase, openDB } from 'idb';
import NFTABI from '_@landing/utils/NFTABI';
import { nextApi } from '_@landing/utils/api';
import MarketABI from '_@landing/utils/NFTMarket';
import NFTFactoryABI from '_@landing/utils/NFTFactory';
import { handleTransferItem } from '_@landing/listener/item';
import { insertSeedTokenData } from '_@landing/services/token';
import { handleNewCollections } from '_@landing/listener/collection';
import { createContext, useContext, useEffect, useState } from 'react';
import { getAllCategories, insertSeedCategoryData } from '_@landing/services/category';
import { ContractEvent, SmartContract, useSDK, useSDKChainId } from '@thirdweb-dev/react';
import { handleBuy, handleCancelListing, handleListing } from '_@landing/listener/market';
import { getCollectionsEvents, getFactoryEvents, getMarketEvents } from '_@landing/listener';
import { getAllCollectionByChain, getBestSeller, updateLastBlock } from '_@landing/services';
import { Chains, ContractEventNames, dbIndex, dbOS, parseJson } from '_@landing/utils/constants';
import {
  ICancelListingEventData,
  ICategory,
  IChain,
  IMetadata,
  INewBuyEventData,
  INewListingEventData,
  INewProxyDeployed,
  ITransferEventData,
  ListenerService,
  TTopSeller,
} from '_@landing/utils/type';

type TCategoryContext = { loading: boolean; data: ICategory[] };
type IndexedDBContextType = {
  db: IDBPDatabase | null;
  bestSeller: TTopSeller;
  category: TCategoryContext;
};

export const IndexedDBContext = createContext<IndexedDBContextType>({} as IndexedDBContextType);

export const useIndexedDBContext = () => useContext(IndexedDBContext);

export default function IndexedDBProvider({ children }: { children: React.ReactNode }) {
  const sdk = useSDK();
  const chainId = useSDKChainId();

  const [chain, setChain] = useState<IChain>();
  const [db, setDB] = useState<IDBPDatabase | null>(null);
  const [bestSeller, setBestSeller] = useState<TTopSeller>([]);
  const [marketContract, setMarketContract] = useState<SmartContract>();
  const [factoryContract, setFactoryContract] = useState<SmartContract>();
  const [collectionsContract, setCollectionsContract] = useState<SmartContract[]>([]);
  const [category, setCategory] = useState<TCategoryContext>({ loading: true, data: [] });

  const { mutateAsync: getUsersInFleamint } = nextApi.getUsersInFleamint.useMutation();

  useEffect(() => {
    const connectDB = async () => {
      if (!window.indexedDB) return;
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

      const category = await getAllCategories(db);
      if (category.length === 0) {
        insertSeedCategoryData(db);
        insertSeedTokenData(db);
      }
      const seller = await getBestSeller(db);

      // Open a transaction on the object store
      setDB(db);
      setCategory({
        loading: false,
        data: category,
      });
      setBestSeller(seller as TTopSeller);
    };

    connectDB();
  }, []);

  useEffect(() => {
    const initContract = async () => {
      const chain = Object.values(Chains).find((chain) => chain.chainId === chainId?.toString());
      if (!sdk || !chainId || !chain || !db) return;

      const collections = await getAllCollectionByChain(db, chainId.toString());

      const [_marketContract, _factoryContract, ...collectionsContracts] = await Promise.all([
        sdk.getContract(chain.marketContract, MarketABI),
        sdk.getContract(chain.factoryContract, NFTFactoryABI),
        ...collections.map((collection) => sdk.getContract(collection.address, NFTABI)),
      ]);

      setChain(chain);
      setMarketContract(_marketContract);
      setFactoryContract(_factoryContract);
      setCollectionsContract(collectionsContracts);
    };

    initContract();
  }, [sdk, chainId, db]);

  useEffect(() => {
    if (!sdk || !db || !chain || !marketContract || !factoryContract) return;
    marketContract.events.listenToAllEvents((event) => {
      if (event.eventName === ContractEventNames.newListing)
        handleListing(sdk, db, chain, event as ContractEvent<INewListingEventData>);
      else if (event.eventName === ContractEventNames.newSale)
        handleBuy(marketContract, db, chain, event as ContractEvent<INewBuyEventData>);
      else if (event.eventName === ContractEventNames.cancelledListing)
        handleCancelListing(
          marketContract,
          db,
          chain,
          event as ContractEvent<ICancelListingEventData>,
        );
    });
    sdk.addListener(ContractEventNames.newCollections, async (proxy) => {
      const contract = await sdk.getContract(proxy, NFTABI);
      contract.events.addEventListener<ITransferEventData>('Transfer', async (event) => {
        handleTransferItem(db, sdk, chain, event);
        updateLastBlock(
          db,
          ListenerService.Collection,
          event.transaction.blockNumber,
          chain.chainId,
        );
      });
    });
    factoryContract.events.addEventListener<INewProxyDeployed>('ProxyDeployed', async (event) => {
      const collectionContract = await sdk.getContract(event.data.proxy, 'nft-collection');
      const metadata: IMetadata = await collectionContract.app.metadata.get();
      const appURI = await parseJson(metadata.app_uri);
      if (!appURI || !appURI.app || appURI.app !== 'Fleamint') return;
      handleNewCollections(sdk, metadata, appURI, collectionContract, chain, db, event);
    });
    collectionsContract.map((contract) => {
      contract.events.addEventListener<ITransferEventData>('Transfer', async (event) => {
        handleTransferItem(db, sdk, chain, event);
        updateLastBlock(
          db,
          ListenerService.Collection,
          event.transaction.blockNumber,
          chain.chainId,
        );
      });
    });

    return () => {
      marketContract.events.removeAllListeners();
      sdk.removeAllListeners();
      factoryContract.events.removeAllListeners();
      collectionsContract.map((contract) => {
        contract.events.removeAllListeners();
      });
    };
  }, [chain, collectionsContract, db, factoryContract, marketContract, sdk]);

  useEffect(() => {
    const isReturn =
      !factoryContract || !marketContract || !sdk || !db || !chain || !getUsersInFleamint;
    if (isReturn) return;
    (async () => {
      await Promise.all([
        getCollectionsEvents(sdk, db, chain),
        getMarketEvents(marketContract, sdk, db, chain),
        getFactoryEvents(factoryContract, sdk, db, chain, getUsersInFleamint),
      ]);
    })();
  }, [chain, db, factoryContract, getUsersInFleamint, marketContract, sdk]);

  return (
    <IndexedDBContext.Provider value={{ db, bestSeller, category }}>
      {children}
    </IndexedDBContext.Provider>
  );
}
