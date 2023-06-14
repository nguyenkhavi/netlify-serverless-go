//THIRD PARTY MODULES
import { ethers } from 'ethers';
import { IDBPDatabase } from 'idb';
import NFTABI from '_@landing/utils/NFTABI';
import MarketABI from '_@landing/utils/NFTMarket';
import NFTFactoryABI from '_@landing/utils/NFTFactory';
import { ContractEvent, ThirdwebSDK } from '@thirdweb-dev/react';
import { Chains, ContractEventNames, blockRanger, parseJson } from '_@landing/utils/constants';
import {
  ICancelListingEventData,
  IChain,
  IItem,
  IMarketData,
  IMetadata,
  IMetadataNFT,
  INewBuyEventData,
  INewListingEventData,
  INewProxyDeployed,
  ITransferEventData,
  ListenerService,
  NFTType,
} from '_@landing/utils/type';
//RELATIVE MODULES
import { handleTransferItem } from './item';
import { handleNewCollections } from './collection';
import { handleBuy, handleCancelListing, handleListing } from './market';
import {
  addItem,
  getAllCollectionByChain,
  getItemById,
  getLastBlock,
  getMarketStatusByListingId,
  getMarketsByItem,
  updateItem,
  updateLastBlock,
  updateMarket,
} from '../services';

export async function startEventListener(db: IDBPDatabase) {
  const sdk = new ThirdwebSDK(Chains.sepolia.name);
  console.time('listener');
  await Promise.all([
    getFactoryEvents(sdk, db, Chains.sepolia),
    getCollectionsEvents(sdk, db, Chains.sepolia),
    getMarketEvents(sdk, db, Chains.sepolia),
  ]);
  console.timeEnd('listener');
}

export async function getMarketEvents(sdk: ThirdwebSDK, db: IDBPDatabase, chain: IChain) {
  const marketContract = await sdk.getContract(chain.marketContract, MarketABI);
  marketContract.events.addEventListener<INewListingEventData>(
    ContractEventNames.newListing,
    async (event) => {
      await handleListing(sdk, db, chain, event);
      await updateLastBlock(
        db,
        ListenerService.Market,
        event.transaction.blockNumber,
        chain.chainId,
      );
    },
  );
  marketContract.events.addEventListener<INewBuyEventData>(
    ContractEventNames.newSale,
    async (event) => {
      await handleBuy(sdk, db, chain, event);
      await updateLastBlock(
        db,
        ListenerService.Market,
        event.transaction.blockNumber,
        chain.chainId,
      );
      /// handle event here
    },
  );
  marketContract.events.addEventListener<ICancelListingEventData>(
    ContractEventNames.cancelledListing,
    async (event) => {
      /// handle event here
      await handleCancelListing(sdk, db, chain, event);
      await updateLastBlock(
        db,
        ListenerService.Market,
        event.transaction.blockNumber,
        chain.chainId,
      );
    },
  );
  const currentBlock =
    (await getLastBlock(db, chain.chainId, ListenerService.Market))?.lastBlock ||
    chain.genesisBlock;
  const lastBlock = await sdk.getProvider().getBlockNumber();
  const totalPage = Math.ceil((lastBlock - currentBlock) / blockRanger);

  for (let currentPage = 0; currentPage < totalPage; currentPage++) {
    const fromBlock = Number(currentBlock) + 1 + currentPage * blockRanger;
    const toBlock =
      lastBlock < Number(currentBlock) + (currentPage + 1) * blockRanger
        ? lastBlock
        : Number(currentBlock) + (currentPage + 1) * blockRanger;
    /// GENESIS BLOCK
    const events = await marketContract.events.getAllEvents({
      fromBlock: fromBlock,
      toBlock: toBlock,
      order: 'asc',
    });

    Promise.all(
      events.map((event) => {
        switch (event.eventName) {
          case ContractEventNames.newListing:
            handleListing(sdk, db, chain, event as ContractEvent<INewListingEventData>);
            break;
          case ContractEventNames.newSale:
            handleBuy(sdk, db, chain, event as ContractEvent<INewBuyEventData>);
            break;
          case ContractEventNames.cancelledListing:
            handleCancelListing(sdk, db, chain, event as ContractEvent<ICancelListingEventData>);
            break;
          default:
            break;
        }
      }),
    );

    await updateLastBlock(db, ListenerService.Market, toBlock, chain.chainId);
  }
}
export async function getFactoryEvents(sdk: ThirdwebSDK, db: IDBPDatabase<unknown>, chain: IChain) {
  const factoryContract = await sdk.getContract(chain.factoryContract, NFTFactoryABI);
  factoryContract.events.addEventListener<INewProxyDeployed>('ProxyDeployed', async (event) => {
    handleNewCollections(sdk, chain, db, event);
  });

  const currentBlock =
    (await getLastBlock(db, chain.chainId, ListenerService.Factory))?.lastBlock ||
    chain.genesisBlock;
  const lastBlock = await sdk.getProvider().getBlockNumber();
  const totalPage = Math.ceil((lastBlock - currentBlock) / blockRanger);
  console.log(
    'Factory',
    {
      currentBlock,
      lastBlock,
      totalPage,
    },
    new Date(),
  );

  for (let currentPage = 0; currentPage < totalPage; currentPage++) {
    const fromBlock = Number(currentBlock) + 1 + currentPage * blockRanger;
    const toBlock =
      lastBlock < Number(currentBlock) + (currentPage + 1) * blockRanger
        ? lastBlock
        : Number(currentBlock) + (currentPage + 1) * blockRanger;
    /// GENESIS BLOCK
    const events = await factoryContract.events.getEvents<INewProxyDeployed>('ProxyDeployed', {
      fromBlock: fromBlock,
      toBlock: toBlock,
      filters: {
        implementation: chain.nftImplementation,
      },
      order: 'asc',
    });

    await Promise.all(
      events.map(async (event) => {
        handleNewCollections(sdk, chain, db, event);
        getAllNFTsOwners(db, sdk, event.data.proxy, chain);
      }),
    );
    await updateLastBlock(db, ListenerService.Factory, toBlock, chain.chainId);
  }
}

export async function getCollectionsEvents(
  sdk: ThirdwebSDK,
  db: IDBPDatabase<unknown>,
  chain: IChain,
) {
  sdk.addListener(ContractEventNames.newCollections, async (proxy) => {
    const contract = await sdk.getContract(proxy, NFTABI);
    contract.events.addEventListener<ITransferEventData>('Transfer', async (event) => {
      await handleTransferItem(db, sdk, chain, event);
      await updateLastBlock(
        db,
        ListenerService.Collection,
        event.transaction.blockNumber,
        chain.chainId,
      );
    });
  });

  const collections = await getAllCollectionByChain(db, chain.chainId);
  console.time(`Time ${'collections'}`);

  const currentBlock =
    (await getLastBlock(db, chain.chainId, ListenerService.Factory))?.lastBlock ||
    chain.genesisBlock;
  const lastBlock = await sdk.getProvider().getBlockNumber();
  const totalPage = Math.ceil((lastBlock - currentBlock) / blockRanger);

  if (!collections.length) {
    await updateLastBlock(db, ListenerService.Collection, lastBlock, chain.chainId);
  } else {
    const provider = await sdk.getProvider();
    for (let currentPage = 0; currentPage < totalPage; currentPage++) {
      const fromBlock = Number(currentBlock) + 1 + currentPage * blockRanger;
      const toBlock =
        lastBlock < Number(currentBlock) + (currentPage + 1) * blockRanger
          ? lastBlock
          : Number(currentBlock) + (currentPage + 1) * blockRanger;

      const iface = new ethers.utils.Interface(NFTABI);

      const logList = await provider.getLogs({
        fromBlock: fromBlock,
        toBlock: toBlock,
        topics: [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer
        ],
      });

      const transferEvents = logList
        .filter((log) => {
          return collections.find((collection) => {
            if (collection.address === log.address) return true;
            return false;
          });
        })
        .map((log) => {
          const data = iface.parseLog(log);
          return {
            eventName: 'Transfer',
            transaction: log,
            data: data.args,
          } as unknown as ContractEvent<ITransferEventData>;
        });

      for (const event of transferEvents) {
        handleTransferItem(db, sdk, chain, event);
      }

      await updateLastBlock(db, ListenerService.Collection, toBlock, chain.chainId);
    }

    Promise.all(
      collections.map(async (collection) => {
        const contract = await sdk.getContract(collection.address, NFTABI);
        contract.events.addEventListener<ITransferEventData>('Transfer', async (event) => {
          await handleTransferItem(db, sdk, chain, event);
          await updateLastBlock(
            db,
            ListenerService.Collection,
            event.transaction.blockNumber,
            chain.chainId,
          );
        });
      }),
    );
  }

  console.timeEnd(`Time ${'collections'}`);
}

export async function getAllNFTsOwners(
  db: IDBPDatabase,
  sdk: ThirdwebSDK,
  address: string,
  chain: IChain,
) {
  const collectionContract = await sdk.getContract(address, 'nft-collection');
  const metadata: IMetadata = await collectionContract.app.metadata.get();
  const appURI = await parseJson(metadata.app_uri);
  const total = (await collectionContract.erc721.totalCount()).toNumber();
  const itemPerPage = 50;
  const totalPage = Math.ceil(total / itemPerPage);
  for (let currentPage = 0; currentPage < totalPage; currentPage++) {
    const nftOwners = await collectionContract.erc721.getAll({
      start: currentPage * itemPerPage,
      count: itemPerPage,
    });
    Promise.all(
      nftOwners.map(async (nft) => {
        const data: IItem = {
          address: address,
          tokenId: Number(nft.metadata.id),
          chain: chain.chainId,
          owner: nft.owner,
          category: appURI?.category || 1,
          name: nft.metadata.name as string,
          type: NFTType.ERC721,
          metadata: nft.metadata as unknown as IMetadataNFT,
          // id = address_tokenId, for getByIndex
          id: address + '_' + Number(nft.metadata.id),
        };

        const item = await getItemById(db, address + '_' + Number(nft.metadata.id));
        if (!item) {
          await addItem(db, data);
        } else {
          /// check market available?
          const market: IMarketData[] = await getMarketsByItem(
            db,
            address + '_' + Number(nft.metadata.id),
          );

          market.map(async (mk) => {
            const marketStatus = await getMarketStatusByListingId(db, mk.listingId);
            if (marketStatus.isAvailable == 1) {
              await updateMarket(db, {
                listingId: mk.listingId,
                isAvailable: 0,
                isBought: 0,
                isCanceled: 1,
              });
            }
          });

          await updateItem(db, data);
        }
      }),
    );
  }
}
