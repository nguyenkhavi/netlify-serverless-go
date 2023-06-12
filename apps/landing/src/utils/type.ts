//THIRD PARTY MODULES
import { BigNumber } from 'ethers';
import { NFTMetadata } from '@thirdweb-dev/react';

export interface IMarketData {
  listingId: number;
  assetContract: string;
  tokenId: number;
  listingCreator: string;
  itemId: string;
  price: number;
  currency: string;
  quantity: number;
  startTime: number;
  endTime: number;
  tokenType: NFTType;
  category: number;
  chain: string;
}

export interface IMarketStatusData {
  listingId: number;
  isAvailable: number;
  isBought: number;
  isCanceled: number;
}

export interface ICollection {
  address: string;
  chain: string;
  owner: string;
  category: number;
  name: string;
  type: NFTType;
  metadata: IMetadata;
}

export interface IItem {
  address: string;
  tokenId: number;
  chain: string;
  owner: string;
  category: number;
  name: string;
  type: NFTType;
  metadata: IMetadataNFT;
  // id = address_tokenId, for getByIndex
  id: string;
}

export interface ILastBlock {
  service: ListenerService;
  lastBlock: number;
  chain: string;
  ///id : service_chain for get index
  id: string;
}

export enum ListenerService {
  Market,
  Factory,
  Collection,
}

export enum NFTType {
  ERC721,
  ERC1155,
}

export enum ActivityType {
  BUY,
  CREATE_LISTING,
  CANCELED_LISTING,
  MINT,
  TRANSFER,
}

export interface IActivity {
  type: ActivityType;
  transactionHash: string;
  transactionIndex: number;
  blockNumber: number;
  assetContract: string;
  itemId: string;
  tokenId: number;
  listingId: number;
  price: number;
  currency: string;
  quantity: number;
  fromAddress: string;
  toAddress: string;
  chain: string;
}

export interface IChain {
  factoryContract: string;
  marketContract: string;
  nftImplementation: string;
  name: string;
  chainId: string;
  genesisBlock: number;
}

export interface IMetadata {
  name: string;
  description: string;
  image: string;
  seller_fee_basis_points: number;
  fee_recipient: string;
  symbol: string;
  app_uri: string;
}

export interface IMetadataNFT {
  name: string;
  description: string;
  background_color: string;
  properties: any[];
  attributes: any[];
  id: string;
  uri: string;
  image: string;
  external_url: string;
  animation_url: string;
}

export interface ITransferEventData {
  from: string;
  to: string;
  tokenId: BigNumber;
}

export interface INewListingEventData {
  listingCreator: string;
  listingId: BigNumber;
  assetContract: string;
  listing: {
    listingId: BigNumber;
    listingCreator: string;
    assetContract: string;
    tokenId: BigNumber;
    quantity: BigNumber;
    currency: string;
    pricePerToken: BigNumber;
    startTimestamp: BigNumber;
    endTimestamp: BigNumber;
    reserved: false;
    tokenType: 0;
    status: 1;
  };
}

export interface INewBuyEventData {
  listingCreator: string;
  listingId: BigNumber;
  assetContract: string;
  tokenId: BigNumber;
  buyer: string;
  quantityBought: BigNumber;
  totalPricePaid: BigNumber;
}

export interface ICancelListingEventData {
  listingCreator: string;
  listingId: BigNumber;
}

export interface INewProxyDeployed extends Record<string, any> {
  implementation: string;
  proxy: string;
  deployer: string;
}
