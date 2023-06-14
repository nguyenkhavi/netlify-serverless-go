//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { BigNumber, constants } from 'ethers';
import { ContractEvent, ThirdwebSDK } from '@thirdweb-dev/react';
import { formatBigNumberToNumberWithDecimal, parseJson } from '_@landing/utils/constants';
import {
  ActivityType,
  IActivity,
  ICancelListingEventData,
  IChain,
  IMarketData,
  IMetadata,
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
  const collectionContract = await sdk.getContract(event.data.assetContract, 'nft-collection');
  const metadata: IMetadata = await collectionContract.app.metadata.get();
  const appURI = await parseJson(metadata.app_uri);
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
    category: appURI?.category || 1,
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
  sdk: ThirdwebSDK,
  db: IDBPDatabase,
  chain: IChain,
  event: ContractEvent<ICancelListingEventData>,
) {
  const marketContract = await sdk.getContract(chain.marketContract, 'marketplace-v3');
  const listing = await marketContract.directListings.getListing(event.data.listingId);
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
  sdk: ThirdwebSDK,
  db: IDBPDatabase,
  chain: IChain,
  event: ContractEvent<INewBuyEventData>,
) {
  const marketContract = await sdk.getContract(chain.marketContract, 'marketplace-v3');
  const listing = await marketContract.directListings.getListing(event.data.listingId);

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

//to do
export async function handleBidding(event: ContractEvent) {}
export async function handleCancelBiding(event: ContractEvent) {}
export async function handleAcceptBiding(event: ContractEvent) {}
export async function handleCancelAuction(event: ContractEvent) {}
export async function handleNewAuction(event: ContractEvent) {}
