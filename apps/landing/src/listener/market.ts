//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { BigNumber, constants } from 'ethers';
import MarketABI from '_@landing/utils/NFTMarket';
import { formatBigNumberToNumberWithDecimal, maxRetries } from '_@landing/utils/constants';
import { ContractEvent, DirectListingV3, SmartContract, ThirdwebSDK } from '@thirdweb-dev/react';
import {
  ActivityType,
  IActivity,
  ICancelListingEventData,
  IChain,
  IMarketData,
  INewBuyEventData,
  INewListingEventData,
} from '_@landing/utils/type';
//RELATIVE MODULES
import { addActivity, addMarket, updateMarket } from '../services';

export async function handleListing(
  sdk: ThirdwebSDK,
  db: IDBPDatabase,
  chain: IChain,
  event: ContractEvent<INewListingEventData>,
) {
  const data: IMarketData = {
    listingId: event.data.listingId.toNumber(),
    assetContract: event.data.assetContract,
    tokenId: event.data.listing.tokenId.toNumber(),
    listingCreator: event.data.listingCreator,
    itemId: event.data.assetContract + '_' + event.data.listing.tokenId.toNumber(),
    blockNumber: event.transaction.blockNumber,
    price: formatBigNumberToNumberWithDecimal(event.data.listing.pricePerToken, 18),
    currency: event.data.listing.currency,
    quantity: event.data.listing.quantity.toNumber(),
    startTime: event.data.listing.startTimestamp.toNumber(),
    endTime: event.data.listing.endTimestamp.toNumber(),
    tokenType: event.data.listing.tokenType,
    chain: chain.chainId,
  };
  await addMarket(db, data);

  await updateMarket(db, {
    listingId: event.data.listingId.toNumber(),
    isAvailable: 1,
    isCanceled: 0,
    isBought: 0,
  });

  const activity: IActivity = {
    type: ActivityType.CREATE_LISTING,
    transactionHash: event.transaction.transactionHash,
    transactionIndex: event.transaction.transactionIndex,
    blockNumber: event.transaction.blockNumber,
    assetContract: event.data.assetContract,
    itemId: event.data.assetContract + '_' + event.data.listing.tokenId.toNumber(),
    tokenId: event.data.listing.tokenId.toNumber(),
    listingId: event.data.listingId.toNumber(),
    price: formatBigNumberToNumberWithDecimal(event.data.listing.pricePerToken, 18),
    currency: event.data.listing.currency,
    quantity: event.data.listing.quantity.toNumber(),
    fromAddress: event.data.listingCreator,
    toAddress: constants.AddressZero,
    chain: chain.chainId,
  };
  await addActivity(db, activity);
}
export async function handleCancelListing(
  marketContract: SmartContract,
  db: IDBPDatabase,
  chain: IChain,
  event: ContractEvent<ICancelListingEventData>,
) {
  const listing = await getListingData(marketContract, chain, event.data.listingId.toNumber());
  await updateMarket(db, {
    listingId: event.data.listingId.toNumber(),
    isAvailable: 0,
    isCanceled: 1,
    isBought: 0,
  });

  const activity: IActivity = {
    type: ActivityType.CANCELED_LISTING,
    transactionHash: event.transaction.transactionHash,
    transactionIndex: event.transaction.transactionIndex,
    blockNumber: event.transaction.blockNumber,
    assetContract: listing.assetContractAddress,
    itemId: listing.assetContractAddress + '_' + listing.tokenId,
    tokenId: Number(listing.tokenId),
    listingId: event.data.listingId.toNumber(),
    price: formatBigNumberToNumberWithDecimal(BigNumber.from(listing.pricePerToken), 18),
    currency: listing.currencyContractAddress,
    quantity: 0,
    fromAddress: event.data.listingCreator,
    toAddress: constants.AddressZero,
    chain: chain.chainId,
  };
  await addActivity(db, activity);
}
export async function handleBuy(
  marketContract: SmartContract,
  db: IDBPDatabase,
  chain: IChain,
  event: ContractEvent<INewBuyEventData>,
) {
  const listing = await getListingData(marketContract, chain, event.data.listingId.toNumber());
  await updateMarket(db, {
    listingId: event.data.listingId.toNumber(),
    isAvailable: 0,
    isCanceled: 0,
    isBought: 1,
  });

  const activity: IActivity = {
    type: ActivityType.BUY,
    transactionHash: event.transaction.transactionHash,
    transactionIndex: event.transaction.transactionIndex,
    blockNumber: event.transaction.blockNumber,
    assetContract: event.data.assetContract,
    itemId: event.data.assetContract + '_' + event.data.tokenId.toNumber(),
    tokenId: event.data.tokenId.toNumber(),
    listingId: event.data.listingId.toNumber(),
    price: formatBigNumberToNumberWithDecimal(event.data.totalPricePaid, 18),
    currency: listing.currencyContractAddress,
    quantity: event.data.quantityBought.toNumber(),
    fromAddress: event.data.buyer,
    toAddress: listing.creatorAddress,
    chain: chain.chainId,
  };
  await addActivity(db, activity);
}

// TODO: handleBidding, handleCancelBiding, handleAcceptBiding, handleCancelAuction, handleNewAuction
// export async function handleBidding(event: ContractEvent) {}
// export async function handleCancelBiding(event: ContractEvent) {}
// export async function handleAcceptBiding(event: ContractEvent) {}
// export async function handleCancelAuction(event: ContractEvent) {}
// export async function handleNewAuction(event: ContractEvent) {}

export async function getListingData(
  marketContract: SmartContract,
  chain: IChain,
  listingId: number,
) {
  let retries = 0;

  async function retrieveData(marketContract: SmartContract): Promise<DirectListingV3> {
    try {
      const listing = await marketContract.directListings.getListing(listingId);
      return listing;
    } catch (error) {
      retries++;
      if (retries <= maxRetries) {
        const sdk = new ThirdwebSDK(chain.rpc);
        const marketContract = await sdk.getContract(chain.marketContract, MarketABI);
        return retrieveData(marketContract);
      } else {
        throw error;
      }
    }
  }

  return retrieveData(marketContract);
}
