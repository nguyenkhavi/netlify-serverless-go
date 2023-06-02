import { mysqlEnum } from 'drizzle-orm/mysql-core';

type ReadOnlyTuple = readonly [string, ...string[]];

export enum ActivityAction {
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  LOG_IN = 'LOG_IN',
  SIGN_UP = 'SIGN_UP',
}
export const activityActionValues = Object.values(ActivityAction) as any as ReadOnlyTuple;
export const activityActionEnum = mysqlEnum('activity-action', activityActionValues);

export enum SuggestionType {
  SUGGESTION = 'SUGGESTION',
  REPORT = 'REPORT',
}
export const SuggestionTypeValues = Object.values(SuggestionType) as any as ReadOnlyTuple;
export const suggestionTypeEnum = mysqlEnum('suggestion-type', SuggestionTypeValues);

export enum TokenStandard {
  ERC_721 = 'ERC_721',
  ERC_1155 = 'ERC_1155',
}
export const TokenStandardValues = Object.values(TokenStandard) as any as ReadOnlyTuple;
export const tokenStandardEnum = mysqlEnum('token-standard', TokenStandardValues);

export enum MarketType {
  AUCTION = 'AUCTION',
  DIRECT_LISTING = 'DIRECT_LISTING',
}
export const MarketTypeValues = Object.values(MarketType) as any as ReadOnlyTuple;
export const marketTypeEnum = mysqlEnum('market-type', MarketTypeValues);

export enum MarketStatus {
  AVAILABLE = 'AVAILABLE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  SUCCESS = 'SUCCESS',
}
export const MarketStatusValues = Object.values(MarketStatus) as any as ReadOnlyTuple;
export const marketStatusEnum = mysqlEnum('market-status', MarketStatusValues);

export enum ActivityType {
  TRANSFER = 'TRANSFER',
  MINT = 'MINT',
  BURN = 'BURN',
  SELL = 'SELL',
  BUY = 'BUY',
  BID = 'BID',
  ACCEPT_BID = 'ACCEPT_BID',
  UPDATE_LISTING = 'UPDATE_LISTING',
  CANCEL_LISTING = 'CANCEL_LISTING',
  CANCEL_BID = 'CANCEL_BID',
}
export const ActivityTypeValues = Object.values(ActivityType) as any as ReadOnlyTuple;
export const activityTypeEnum = mysqlEnum('activity-type', ActivityTypeValues);
