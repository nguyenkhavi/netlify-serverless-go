//THIRD PARTY MODULES
import { ethers } from 'ethers';
import { IDBPDatabase } from 'idb';
import NFTABI from '_@landing/utils/NFTABI';
import { nextApi } from '_@landing/utils/api';
import MarketABI from '_@landing/utils/NFTMarket';
import NFTFactoryABI from '_@landing/utils/NFTFactory';
import { ContractEvent, NFTCollection, SmartContract, ThirdwebSDK } from '@thirdweb-dev/react';
import { ContractEventNames, blockRange, maxRetries, parseJson } from '_@landing/utils/constants';
import {
  ICancelListingEventData,
  IChain,
  ICollection,
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
import { handleBuy, handleCancelListing, handleListing } from './market';
import {
  fetchAllNFTOwners,
  fetchCountNFT,
  getCollectionMetadata,
  handleNewCollections,
} from './collection';
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

type TUsersInFleamintFnc = typeof nextApi.getUsersInFleamint.useMutation;
type MutateAsyncFn = ReturnType<TUsersInFleamintFnc>['mutateAsync'];

export async function getMarketEvents(
  marketContract: SmartContract,
  sdk: ThirdwebSDK,
  db: IDBPDatabase,
  chain: IChain,
) {
  const currentBlock =
    (await getLastBlock(db, chain.chainId, ListenerService.Market)) || chain.genesisBlock;

  const lastBlock = await sdk.getProvider().getBlockNumber();

  const totalPage = Math.ceil((lastBlock - currentBlock) / blockRange);

  for (let currentPage = 0; currentPage < totalPage; currentPage++) {
    const fromBlock = currentBlock + 1 + currentPage * blockRange;
    const toBlock = Math.min(lastBlock, currentBlock + (currentPage + 1) * blockRange);

    try {
      const events = await fetchMarketEvents(marketContract, chain, fromBlock, toBlock);

      await Promise.all(
        events?.map((event) => {
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
        }),
      );
      console.log('market events', { fromBlock, toBlock, events });

      updateLastBlock(db, ListenerService.Market, toBlock, chain.chainId);
    } catch (e) {
      console.log('market error', { fromBlock, toBlock, e });
    }
  }
}
export async function fetchMarketEvents(
  marketContract: SmartContract,
  chain: IChain,
  fromBlock: number,
  toBlock: number,
) {
  let retries = 0;

  async function retrieveEvents(marketContract: SmartContract): Promise<ContractEvent[]> {
    try {
      const events = await marketContract.events.getAllEvents({ fromBlock, toBlock, order: 'asc' });
      return events;
    } catch (error) {
      retries++;
      if (retries <= maxRetries) {
        const sdk = new ThirdwebSDK(chain.rpc);
        const marketContract = await sdk.getContractFromAbi(chain.marketContract, MarketABI);
        return retrieveEvents(marketContract);
      } else {
        return [];
      }
    }
  }

  return retrieveEvents(marketContract);
}

export async function fetchFactoryEvents(
  factoryContract: SmartContract,
  chain: IChain,
  fromBlock: number,
  toBlock: number,
) {
  let retries = 0;

  async function retrieveEvents(
    factoryContract: SmartContract,
  ): Promise<ContractEvent<INewProxyDeployed>[]> {
    try {
      const events: ContractEvent<INewProxyDeployed>[] = await factoryContract.events.getEvents(
        'ProxyDeployed',
        {
          fromBlock,
          toBlock,
          filters: {
            implementation: chain.nftImplementation,
          },
          order: 'asc',
        },
      );
      return events;
    } catch (error) {
      retries++;
      if (retries <= maxRetries) {
        const sdk = new ThirdwebSDK(chain.rpc);
        const factoryContract = await sdk.getContractFromAbi(chain.factoryContract, NFTFactoryABI);
        return retrieveEvents(factoryContract);
      } else {
        throw error;
      }
    }
  }
  return retrieveEvents(factoryContract);
}

export async function fetchTransferEvents(
  chain: IChain,
  sdk: ThirdwebSDK,
  fromBlock: number,
  toBlock: number,
  collections: ICollection[],
) {
  let retries = 0;

  async function retrieveEvents(sdk: ThirdwebSDK): Promise<ContractEvent<ITransferEventData>[]> {
    try {
      const provider = await sdk.getProvider();
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

      return transferEvents;
    } catch (error) {
      retries++;
      if (retries <= maxRetries) {
        const sdk = new ThirdwebSDK(chain.rpc);
        return retrieveEvents(sdk);
      } else {
        return [];
      }
    }
  }
  return retrieveEvents(sdk);
}

// ----------------------------------------------------------------------------

export async function getFactoryEvents(
  factoryContract: SmartContract,
  sdk: ThirdwebSDK,
  db: IDBPDatabase<unknown>,
  chain: IChain,
  getUsersInFleamint: MutateAsyncFn,
) {
  const currentBlock =
    (await getLastBlock(db, chain.chainId, ListenerService.Factory)) || chain.genesisBlock;
  const lastBlock = await sdk.getProvider().getBlockNumber();
  const totalPage = Math.ceil((lastBlock - currentBlock) / blockRange);

  console.log('Factory', { currentBlock, lastBlock, totalPage }, new Date());
  for (let currentPage = 0; currentPage < totalPage; currentPage++) {
    const fromBlock = currentBlock + 1 + currentPage * blockRange;
    const toBlock = Math.min(lastBlock, currentBlock + (currentPage + 1) * blockRange);

    /// GENESIS BLOCK
    try {
      const events = await fetchFactoryEvents(factoryContract, chain, fromBlock, toBlock);
      if (!events.length) continue;
      const addresses = events.map((event) => event.data.deployer);
      const usersInFleamint = await getUsersInFleamint({
        wallets: addresses,
      });

      const filledEvents = events.filter((event) => {
        return usersInFleamint.some((user) => {
          return user.wallet === event.data.deployer;
        });
      });

      console.log('Factory', { fromBlock, toBlock, filledEvents });

      await Promise.all(
        filledEvents?.map(async (event) => {
          const { collectionContract, metadata } = await getCollectionMetadata(
            sdk,
            event.data.proxy,
            chain,
          );
          if (!collectionContract) return;
          const appURI = await parseJson(metadata?.app_uri);
          // if (!appURI || !appURI.app || appURI.app !== 'Fleamint') return;
          handleNewCollections(sdk, metadata, appURI, collectionContract, chain, db, event);
          getAllNFTsOwners(db, collectionContract, appURI, event.data.proxy, chain);
        }),
      );

      updateLastBlock(db, ListenerService.Factory, toBlock, chain.chainId);
    } catch (e) {
      console.log('Factory error', { fromBlock, toBlock, e });
    }
  }
}

// ----------------------------------------------------------------------------

export async function getCollectionsEvents(
  sdk: ThirdwebSDK,
  db: IDBPDatabase<unknown>,
  chain: IChain,
) {
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
  for (let currentPage = 0; currentPage < totalPage; currentPage++) {
    const fromBlock = currentBlock + 1 + currentPage * blockRange;
    const toBlock = Math.min(lastBlock, currentBlock + (currentPage + 1) * blockRange);

    try {
      const transferEvents = await fetchTransferEvents(chain, sdk, fromBlock, toBlock, collections);
      await Promise.all(transferEvents?.map((event) => handleTransferItem(db, sdk, chain, event)));

      updateLastBlock(db, ListenerService.Collection, toBlock, chain.chainId);
    } catch (e) {
      console.log('Collection error', { fromBlock, toBlock, e });
    }
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
  try {
    const total = await fetchCountNFT(collectionContract, address, chain);
    const itemPerPage = 50;
    const totalPage = Math.ceil(total / itemPerPage);
    for (let currentPage = 0; currentPage < totalPage; currentPage++) {
      const nftOwners = await fetchAllNFTOwners(
        collectionContract,
        address,
        chain,
        currentPage * itemPerPage,
        itemPerPage,
      );

      await Promise.all(
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

            updateMarket(db, {
              listingId: mk.listingId,
              isAvailable: 0,
              isBought: 0,
              isCanceled: 1,
            });
          });

          updateItem(db, data);
        }),
      );
    }
  } catch (e) {
    console.log(e);
  }
}
