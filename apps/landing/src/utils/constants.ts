//THIRD PARTY MODULES
import { BigNumber } from 'ethers';
import { Decimal } from 'decimal.js';
//RELATIVE MODULES
import { Chain, Token } from './type';

export const blockRange = 20000;

export const dbIndex = {
  //// market indexes
  marketCreatorIndex: 'market_creator_idx',
  marketAssetContractIndex: 'market_asset_contract_idx',
  marketItemIdIndex: 'market_item_id_idx',
  marketCategoryIndex: 'market_category_idx',
  marketListingIdIndex: 'market_listing_id_idx',
  marketAvailableIndex: 'market_available_idx',
  marketCanceledIndex: 'market_canceled_idx',
  marketSuccessIndex: 'market_success_idx',

  //// collection indexes
  collectionCategoryIndex: 'collection_category_idx',
  collectionOwnerIndex: 'collection_owner_idx',
  collectionAddressIndex: 'collection_address_idx',
  collectionChainIndex: 'collection_chain_idx',
  collectionNameIndex: 'collection_name_idx',
  collectionSlugIndex: 'collection_slug_idx',

  //// activity indexes

  activityTypeIndex: 'activity_type_idx',
  activityFromAddressIndex: 'activity_from_address_idx',
  activityToAddressIndex: 'activity_to_address_idx',
  activityAssetContractIndex: 'activity_asset_contract_idx',
  activityTokenIdIndex: 'activity_token_id_idx',
  activityItemIdIndex: 'activity_item_id_idx',

  lastBlockIdIndex: 'last_block_id_idx',
  //// items indexes

  itemOwnerIndex: 'item_owner_idx',
  itemIdIndex: 'item_id_idx',
  itemAssetContractIndex: 'item_asset_contract_idx',
  itemTokenIdIndex: 'item_token_id_idx',

  /// category indexed:
  categoryIdIndex: 'category_id_idx',

  /// token address:
  tokenAddressIndex: 'token_address_idx',
  tokenChainIndex: 'token_chain_idx',
};

export const dbOS = {
  collection: 'collection',
  activity: 'activity',
  market: 'market',
  items: 'items',
  lastBlock: 'last_block',
  marketStatus: 'market_status',
  token: 'token',
  category: 'category',
};

export const Tokens: Record<string, Token> = {
  BUSD: {
    name: 'BUSD',
    symbol: 'BUSD',
    decimal: 18,
    address: '0x17fFbC8564E9E403eFC0abF55d93a313B3Fac316',
    isNative: false,
    chainId: '11155111',
    image: 'QmdEpFzLA3hkTk2rTpfyLeQLrH97Sxb2U2LgLMcRYgN2Xh/BUSD.png',
    isPaymentToken: true,
  },
  sETH: {
    name: 'Sepolia ETH',
    symbol: 'sETH',
    decimal: 18,
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    isNative: true,
    chainId: '11155111',
    image: 'QmdEpFzLA3hkTk2rTpfyLeQLrH97Sxb2U2LgLMcRYgN2Xh/BUSD.png',
    isPaymentToken: false,
  },
};

export const Chains: Record<string, Chain> = {
  sepolia: {
    factoryContract: '0x76f948e5f13b9a84a81e5681df8682bbf524805e',
    marketContract: '0x0a7D39504176eE6de53a6e320fb47c5D44f3666A',
    nftImplementation: '0xfb602877454eA0Ba5de322f32A27262cb0905e37',
    name: 'sepolia',
    rpc: 'https://eth-sepolia.g.alchemy.com/v2/_8hM_H2lFo-7ub_l5x8x01AhpdUMkRJm',
    icon: 'https://s1.coincarp.com/logo/1/ethereum.png?style=36',
    networkName: 'Sepolia Testnet',
    chainId: '11155111',
    genesisBlock: 3788760,
  },
};

export const ContractEventNames = {
  newCollections: 'newCollections',
  transfer: 'Transfer',
  mint: 'Mint',
  burn: 'Burn',
  newListing: 'NewListing',
  newSale: 'NewSale',
  updateListing: 'UpdatedListing',
  cancelledListing: 'CancelledListing',
  auctionClosed: 'AuctionClosed',
  cancelledAuction: 'CancelledAuction',
  newAuction: 'NewAuction',
  newBid: 'NewBid',
  acceptedOffer: 'AcceptedOffer',
  cancelledOffer: 'CancelledOffer',
  newOffer: 'NewOffer',
} as const;

export function formatBigNumberToNumberWithDecimal(bigNumber: BigNumber, decimal: number) {
  return new Decimal(bigNumber._hex).div(new Decimal(10).pow(decimal)).toNumber();
}

export function formatNumberToBigNumberWithDecimal(quantity: number, decimal: number) {
  return BigNumber.from(new Decimal(quantity).mul(new Decimal(10).pow(decimal)).toHex());
}

export const pageSize = 16;

export const maxRetries = 5;

export async function parseJson(jsonString: string | undefined) {
  try {
    if (!jsonString) return null;
    return JSON.parse(jsonString);
  } catch (e) {
    return null;
  }
}

export const PRICE_FILTER = [
  { label: 'Under $100', path: '0:100' },
  { label: '$100 to $500', path: '100:500' },
  { label: '$500 to $1000', path: '500:1000' },
  { label: '$1000 to $5000', path: '1000:5000' },
];

export const FILTER_ITEMS = [
  { value: 'hot-product', label: 'Hot Products 💥' },
  { value: 'price:asc', label: 'Price: Low to High' },
  { value: 'price:desc', label: 'Price: High to Low' },
  { value: 'date:desc', label: 'Release Date: Latest' },
  { value: 'date:asc', label: 'Release Date: Oldest' },
];

export const OPTIONS_FILTER = [
  { label: 'Release Date: Latest', value: 'date:desc' },
  { label: 'Price: Low to High', value: 'price:asc' },
  { label: 'Price: High to Low', value: 'price:desc' },
  { label: 'Release Date: Oldest', value: 'date:asc' },
  { label: 'Trending', value: 'trending' },
];
