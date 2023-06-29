'use client';

//THIRD PARTY MODULES
import NFTABI from '_@landing/utils/NFTABI';
import { nextApi } from '_@landing/utils/api';
import MarketABI from '_@landing/utils/NFTMarket';
import { IDBPDatabase, deleteDB, openDB } from 'idb';
import NFTFactoryABI from '_@landing/utils/NFTFactory';
import { handleTransferItem } from '_@landing/listener/item';
import { handleNewCollections } from '_@landing/listener/collection';
import { createContext, useContext, useEffect, useState } from 'react';
import { getAllCategories, insertSeedCategoryData } from '_@landing/services/category';
import { getCollectionsEvents, getFactoryEvents, getMarketEvents } from '_@landing/listener';
import { getAllCollectionByChain, getBestSeller, updateLastBlock } from '_@landing/services';
import { Chains, ContractEventNames, dbIndex, dbOS, parseJson } from '_@landing/utils/constants';
import {
  handleBuy,
  handleCancelListing,
  handleListing,
  handleUpdateListing,
} from '_@landing/listener/market';
import {
  ContractEvent,
  SmartContract,
  encodeConstructorParamsForImplementation,
  useSDK,
  useSDKChainId,
} from '@thirdweb-dev/react';
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
type TBestSeller = { loading: boolean; data: TTopSeller };
type IndexedDBContextType = {
  db: IDBPDatabase | null;
  bestSeller: TBestSeller;
  category: TCategoryContext;
};

type Contracts = {
  market: SmartContract;
  factory: SmartContract;
  collections: SmartContract[] | [];
} | null;

export const IndexedDBContext = createContext<IndexedDBContextType>({} as IndexedDBContextType);

export const useIndexedDBContext = () => useContext(IndexedDBContext);

export default function IndexedDBProvider({ children }: { children: React.ReactNode }) {
  const sdk = useSDK();
  const chainId = useSDKChainId();
  const [chain, setChain] = useState<IChain>();
  const [db, setDB] = useState<IDBPDatabase | null>(null);
  const [bestSeller, setBestSeller] = useState<TBestSeller>({ loading: true, data: [] });
  const [category, setCategory] = useState<TCategoryContext>({ loading: true, data: [] });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitContract, setIsInitContract] = useState<boolean>(false);
  const [contracts, setContracts] = useState<Contracts>();
  const { mutateAsync: getUsersInFleamint } = nextApi.getUsersInFleamint.useMutation();

  useEffect(() => {
    const connectDB = async () => {
      if (!window.indexedDB) return;
      const db = await openDB('Fleamint', 2, {
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
            collection.createIndex(dbIndex.collectionNameIndex, 'name');
            collection.createIndex(dbIndex.collectionSlugIndex, 'slug');
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
            const item = db.createObjectStore(dbOS.items, {
              keyPath: ['id'],
            });
            item.createIndex(dbIndex.itemOwnerIndex, 'owner');
            item.createIndex(dbIndex.itemAssetContractIndex, 'address');
            item.createIndex(dbIndex.itemTokenIdIndex, 'tokenId');
            /// create a field = contract address +_+ tokenId
            item.createIndex(dbIndex.itemIdIndex, 'id');
          }
          if (!db.objectStoreNames.contains(dbOS.category)) {
            const market = db.createObjectStore(dbOS.category, {
              keyPath: ['id'],
            });
            market.createIndex(dbIndex.categoryIdIndex, 'id');
          }
        },
      });

      const category = await getAllCategories(db);
      if (category.length === 0) {
        insertSeedCategoryData(db);
      }

      // Open a transaction on the object store
      setDB(db);
    };

    connectDB();
  }, []);

  useEffect(() => {
    if (!db || isLoading) return;
    (async () => {
      const category = await getAllCategories(db);
      if (category.length === 0) {
        insertSeedCategoryData(db);
        insertSeedTokenData(db);
      }
      const seller = await getBestSeller(db);

      setCategory({
        loading: false,
        data: category,
      });
      setBestSeller({
        loading: false,
        data: seller,
      });
    })();
  }, [db, isLoading]);

  useEffect(() => {
    if (contracts || isInitContract) return;
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
      setContracts({
        market: _marketContract,
        factory: _factoryContract,
        collections: collectionsContracts,
      });
      setIsInitContract(true);
    };

    initContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk, chainId, db, contracts]);

  useEffect(() => {
    if (!contracts || !sdk || !db || !chain) return;
    contracts.market.events.listenToAllEvents((event) => {
      if (event.eventName === ContractEventNames.newListing) {
        handleListing(db, chain, event as ContractEvent<INewListingEventData>);
      } else if (event.eventName === ContractEventNames.newSale) {
        handleBuy(contracts.market, db, chain, event as ContractEvent<INewBuyEventData>);
      } else if (event.eventName === ContractEventNames.cancelledListing) {
        handleCancelListing(
          contracts.market,
          db,
          chain,
          event as ContractEvent<ICancelListingEventData>,
        );
      } else if (event.eventName === ContractEventNames.updateListing) {
        handleUpdateListing(
          contracts.market,
          db,
          chain,
          event as ContractEvent<INewListingEventData>,
        );
      }
      updateLastBlock(db, ListenerService.Market, event.transaction.blockNumber, chain.chainId);
    });
    sdk.addListener(ContractEventNames.newCollections, async (proxy) => {
      const contract = await sdk.getContract(proxy, 'nft-collection');
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
    contracts.factory.events.addEventListener<INewProxyDeployed>('ProxyDeployed', async (event) => {
      const collectionContract = await sdk.getContract(event.data.proxy, 'nft-collection');
      const metadata: IMetadata = await collectionContract.app.metadata.get();
      const appURI = await parseJson(metadata.app_uri);
      if (!appURI || !appURI.app || appURI.app !== 'Fleamint') return;
      handleNewCollections(metadata, appURI, collectionContract, chain, db, event);
      updateLastBlock(db, ListenerService.Factory, event.transaction.blockNumber, chain.chainId);
      sdk.emit(ContractEventNames.newCollections, event.data.proxy);
    });
    contracts.collections.map((contract) => {
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
      contracts.market.events.removeAllListeners();
      sdk.removeAllListeners();
      contracts.factory.events.removeAllListeners();
      contracts.collections.map((collection) => {
        collection.events.removeAllListeners();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, contracts, db, sdk]);

  useEffect(() => {
    const isReturn = isLoading || !contracts || !sdk || !db || !chain || !getUsersInFleamint;
    if (isReturn) return;
    (async () => {
      setIsLoading(true);
      try {
        Promise.all([
          getCollectionsEvents(sdk, db, chain),
          getMarketEvents(contracts.market, sdk, db, chain),
          getFactoryEvents(contracts.factory, sdk, db, chain, getUsersInFleamint),
        ]);
      } finally {
        setIsLoading(false);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, db, contracts]);

  return (
    <IndexedDBContext.Provider value={{ db, bestSeller, category }}>
      {children}
    </IndexedDBContext.Provider>
  );
}
