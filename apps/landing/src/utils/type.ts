//THIRD PARTY MODULES
import { BigNumber } from 'ethers';
import {
  getBestSeller,
  getDetailCollectionByAddress,
  getItemByOwner,
  getTrendingCollectionsByCategory,
} from '_@landing/services';

export interface IMarketData {
  listingId: number;
  assetContract: string;
  tokenId: number;
  listingCreator: string;
  itemId: string;
  price: number;
  currency: string;
  quantity: number;
  blockNumber: number;
  startTime: number;
  endTime: number;
  tokenType: NFTType;
  chain: string;
}

export interface IMarketStatusData {
  listingId: number;
  isAvailable: number;
  isBought: number;
  isCanceled: number;
}

export interface IDefaultRoyalties {
  seller_fee_basis_points: number;
  fee_recipient: string;
}

export interface ICollection {
  address: string;
  chain: string;
  owner: string;
  slug: string;
  category: number;
  blockNumber: number;
  name: string;
  type: NFTType;
  metadata: IMetadata;
  royalty: number;
  royaltyRecipient: string;
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

export interface ICollectionPercent {
  name: string;
  percent: string;
}

export interface IUserPortfolio {
  data: ICollectionPercent[];
  total: number;
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
  UPDATE_LISTING,
}

export interface IActivity {
  type: ActivityType;
  transactionHash: string;
  transactionIndex: number;
  blockNumber: number;
  assetContract: string;
  itemId: string;
  tokenId: number;
  listingId?: number;
  price: number;
  currency?: string;
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
  rpc: string;
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
  attributes: IAttribute[];
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

export interface IPaging {
  page: number;
  pageSize: number;
}
export interface ISorting {
  price?: 'asc' | 'desc';
  releaseDate?: 'asc' | 'desc';
}

export interface IFilter {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
  image: string;
}

export type Chain = {
  factoryContract: string;
  marketContract: string;
  nftImplementation: string;
  name: string;
  icon: string;
  rpc: string;
  networkName: string;
  chainId: string;
  genesisBlock: number;
};

export type Token = {
  name: string;
  symbol: string;
  decimal: number;
  isNative: boolean;
  image: string;
  address: string;
  chainId: string;
  isPaymentToken: boolean;
};

export type TItemCard = IMarketData & {
  item: IItem;
  token: Token | undefined;
  activities: IActivity[];
  status: IMarketStatusData;
  totalSale: number;
};
export type TItemStore = Awaited<ReturnType<typeof getItemByOwner>>['data'];
export type TTopSeller = Awaited<ReturnType<typeof getBestSeller>>;
export type TCollectionCard = Awaited<
  ReturnType<typeof getTrendingCollectionsByCategory>
>['data'][number];
export type TCollectionStore = Awaited<ReturnType<typeof getDetailCollectionByAddress>>;
export type TDataCheckout = Pick<
  TItemCard,
  'price' | 'quantity' | 'item' | 'token' | 'itemId' | 'listingId' | 'listingCreator'
>;

export type IAttribute = {
  trait_type: string;
  value: string;
};
