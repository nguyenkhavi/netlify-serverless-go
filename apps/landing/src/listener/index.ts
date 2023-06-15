//THIRD PARTY MODULES
import { ethers } from 'ethers';
import { IDBPDatabase } from 'idb';
import NFTABI from '_@landing/utils/NFTABI';
import MarketABI from '_@landing/utils/NFTMarket';
import NFTFactoryABI from '_@landing/utils/NFTFactory';
import { ContractEvent, NFTCollection, ThirdwebSDK } from '@thirdweb-dev/react';
import { Chains, ContractEventNames, blockRange, parseJson } from '_@landing/utils/constants';
import {
  ICancelListingEventData,
  IChain,
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
  getAllRawMarketsByItem,
  getItemById,
  getLastBlock,
  getMarketStatusByListingId,
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
    (event) => {
      handleListing(sdk, db, chain, event);
      updateLastBlock(db, ListenerService.Market, event.transaction.blockNumber, chain.chainId);
    },
  );
  marketContract.events.addEventListener<INewBuyEventData>(ContractEventNames.newSale, (event) => {
    handleBuy(sdk, db, chain, event);
    updateLastBlock(db, ListenerService.Market, event.transaction.blockNumber, chain.chainId);
  });

  marketContract.events.addEventListener<ICancelListingEventData>(
    ContractEventNames.cancelledListing,
    (event) => {
      handleCancelListing(sdk, db, chain, event);
      updateLastBlock(db, ListenerService.Market, event.transaction.blockNumber, chain.chainId);
    },
  );

  const currentBlock =
    (await getLastBlock(db, chain.chainId, ListenerService.Market)) || chain.genesisBlock;
  const lastBlock = await sdk.getProvider().getBlockNumber();
  const totalPage = Math.ceil((lastBlock - currentBlock) / blockRange);

  for (let currentPage = 0; currentPage < totalPage; currentPage++) {
    const fromBlock = currentBlock + 1 + currentPage * blockRange;
    const toBlock = Math.min(lastBlock, currentBlock + (currentPage + 1) * blockRange);
    /// GENESIS BLOCK
    const events = await marketContract.events.getAllEvents({ fromBlock, toBlock, order: 'asc' });

    events.map((event) => {
      if (event.eventName === ContractEventNames.newListing)
        handleListing(sdk, db, chain, event as ContractEvent<INewListingEventData>);
      else if (event.eventName === ContractEventNames.newSale)
        handleBuy(sdk, db, chain, event as ContractEvent<INewBuyEventData>);
      else if (event.eventName === ContractEventNames.cancelledListing)
        handleCancelListing(sdk, db, chain, event as ContractEvent<ICancelListingEventData>);
    });

    updateLastBlock(db, ListenerService.Market, toBlock, chain.chainId);
  }
}

// ----------------------------------------------------------------------------

export async function getFactoryEvents(sdk: ThirdwebSDK, db: IDBPDatabase<unknown>, chain: IChain) {
  const factoryContract = await sdk.getContract(chain.factoryContract, NFTFactoryABI);
  factoryContract.events.addEventListener<INewProxyDeployed>('ProxyDeployed', async (event) => {
    const collectionContract = await sdk.getContract(event.data.proxy, 'nft-collection');
    const metadata: IMetadata = await collectionContract.app.metadata.get();
    const appURI = await parseJson(metadata.app_uri);
    if (!appURI || !appURI.app || appURI.app !== 'Fleamint') return;
    handleNewCollections(sdk, metadata, appURI, chain, db, event);
  });

  const currentBlock =
    (await getLastBlock(db, chain.chainId, ListenerService.Factory)) || chain.genesisBlock;
  const lastBlock = await sdk.getProvider().getBlockNumber();
  const totalPage = Math.ceil((lastBlock - currentBlock) / blockRange);

  console.log('Factory', { currentBlock, lastBlock, totalPage }, new Date());

  for (let currentPage = 0; currentPage < totalPage; currentPage++) {
    const fromBlock = currentBlock + 1 + currentPage * blockRange;
    const toBlock = Math.min(lastBlock, currentBlock + (currentPage + 1) * blockRange);

    /// GENESIS BLOCK
    const events = await factoryContract.events.getEvents<INewProxyDeployed>('ProxyDeployed', {
      fromBlock: fromBlock,
      toBlock: toBlock,
      filters: { implementation: chain.nftImplementation },
      order: 'asc',
    });

    events.map(async (event) => {
      const collectionContract = await sdk.getContract(event.data.proxy, 'nft-collection');
      const metadata: IMetadata = await collectionContract.app.metadata.get();
      const appURI = await parseJson(metadata.app_uri);
      if (!appURI || !appURI.app || appURI.app !== 'Fleamint') return;
      handleNewCollections(sdk, metadata, appURI, chain, db, event);
      getAllNFTsOwners(db, collectionContract, appURI, event.data.proxy, chain);
    });

    updateLastBlock(db, ListenerService.Factory, toBlock, chain.chainId);
  }
}

// ----------------------------------------------------------------------------

export async function getCollectionsEvents(
  sdk: ThirdwebSDK,
  db: IDBPDatabase<unknown>,
  chain: IChain,
) {
  //Add listener for new collections
  sdk.addListener(ContractEventNames.newCollections, async (proxy) => {
    const contract = await sdk.getContract(proxy, NFTABI);
    contract.events.addEventListener<ITransferEventData>('Transfer', async (event) => {
      handleTransferItem(db, sdk, chain, event);
      updateLastBlock(db, ListenerService.Collection, event.transaction.blockNumber, chain.chainId);
    });
  });

  //Get Collections and blocks
  const collections = await getAllCollectionByChain(db, chain.chainId);

  const currentBlock =
    (await getLastBlock(db, chain.chainId, ListenerService.Factory)) || chain.genesisBlock;

  const lastBlock = await sdk.getProvider().getBlockNumber();
  const totalPage = Math.ceil((lastBlock - currentBlock) / blockRange);

  //Update last block if no collections
  if (!collections.length)
    return updateLastBlock(db, ListenerService.Collection, lastBlock, chain.chainId);

  //Main
  const provider = await sdk.getProvider();
  for (let currentPage = 0; currentPage < totalPage; currentPage++) {
    const fromBlock = currentBlock + 1 + currentPage * blockRange;
    const toBlock = Math.min(lastBlock, currentBlock + (currentPage + 1) * blockRange);

    const iface = new ethers.utils.Interface(NFTABI);

    const logList = await provider.getLogs({
      fromBlock: fromBlock,
      toBlock: toBlock,
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer
      ],
    });

    const transferEvents = logList
      .filter((log) => collections.some((collection) => collection.address === log.address))
      .map((log) => {
        const data = iface.parseLog(log);
        return {
          eventName: 'Transfer',
          transaction: log,
          data: data.args,
        } as unknown as ContractEvent<ITransferEventData>;
      });

    transferEvents.map((event) => handleTransferItem(db, sdk, chain, event));

    updateLastBlock(db, ListenerService.Collection, toBlock, chain.chainId);

    collections.map(async (collection) => {
      const contract = await sdk.getContract(collection.address, NFTABI);
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
  }
}

// ----------------------------------------------------------------------------

export async function getAllNFTsOwners(
  db: IDBPDatabase,
  collectionContract: NFTCollection,
  appURI: any,
  address: string,
  chain: IChain,
) {
  // WHY COERCE BIGNUMBER TO NUMBER ? IS IT STILL SAFE ?
  const total = (await collectionContract.erc721.totalCount()).toNumber();
  const itemPerPage = 50;
  const totalPage = Math.ceil(total / itemPerPage);
  for (let currentPage = 0; currentPage < totalPage; currentPage++) {
    const nftOwners = await collectionContract.erc721.getAll({
      start: currentPage * itemPerPage,
      count: itemPerPage,
    });

    nftOwners.map(async (nft) => {
      const data = {
        address: address,
        tokenId: Number(nft.metadata.id),
        chain: chain.chainId,
        owner: nft.owner,
        category: appURI?.category || 1,
        name: nft.metadata.name as string,
        type: NFTType.ERC721,
        metadata: nft.metadata as unknown as IMetadataNFT,
        // id = address_tokenId, for getByIndex
        id: address + '_' + nft.metadata.id,
      };

      const item = await getItemById(db, address + '_' + nft.metadata.id);
      if (!item) return addItem(db, data);

      /// check market available?
      const market = await getAllRawMarketsByItem(db, address + '_' + nft.metadata.id);

      market.forEach(async (mk) => {
        const marketStatus = await getMarketStatusByListingId(db, mk.listingId);
        if (marketStatus.isAvailable !== 1) return;

        updateMarket(db, { listingId: mk.listingId, isAvailable: 0, isBought: 0, isCanceled: 1 });
      });

      updateItem(db, data);
    });
  }
}
