//THIRD PARTY MODULES
import { ActivityType, NFTType } from '_@landing/utils/type';

export const MARKET_ITEM_RECENTLY_VIEWED = 'market_item_recently_viewed';

export const ACTIVITY_TYPES = {
  [ActivityType.BUY]: 'Buy',
  [ActivityType.CREATE_LISTING]: 'Create listing',
  [ActivityType.CANCELED_LISTING]: 'Cancel listing',
  [ActivityType.MINT]: 'Mint',
  [ActivityType.TRANSFER]: 'Transfer',
};

export const NFT_TYPES = {
  [NFTType.ERC1155]: 'ERC-1155',
  [NFTType.ERC721]: 'ERC-721',
};

export const CHANNEL_NAME_PREFIX = 'market_item_detail_';
