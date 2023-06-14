//THIRD PARTY MODULES
import { BigNumber } from 'ethers';
import { Decimal } from 'decimal.js';

export const blockRanger = 50000;

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

export const Chains = {
  sepolia: {
    factoryContract: '0x76f948e5f13b9a84a81e5681df8682bbf524805e',
    marketContract: '0x0a7D39504176eE6de53a6e320fb47c5D44f3666A',
    nftImplementation: '0xfb602877454eA0Ba5de322f32A27262cb0905e37',
    name: 'sepolia',
    chainId: '11155111',
    genesisBlock: 3455697,
  },
} as const;

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

export const pageSize = 20;

export async function parseJson(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return null;
  }
}
