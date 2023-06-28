import { mysqlEnum } from 'drizzle-orm/mysql-core';

//type for readonly array of string that length >= 1
type ReadOnlyTuple = readonly [string, ...string[]];

export enum ActivityAction {
  // CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  LOG_IN = 'LOG_IN',
  SIGN_UP = 'SIGN_UP',
  SUBMIT_ID_VERIFICATION = 'SUBMIT_ID_VERIFICATION',
  SUBMIT_ADDRESS_VERIFICATION = 'ADDRESS_VERIFICATION',
}
export const ActivityActionValues = Object.values(ActivityAction) as any as ReadOnlyTuple;
export const ActivityActionEnum = mysqlEnum('activity-action', ActivityActionValues);

export enum SuggestionType {
  SUGGESTION = 'SUGGESTION',
  REPORT = 'REPORT',
}
export const SuggestionTypeValues = Object.values(SuggestionType) as any as ReadOnlyTuple;
export const SuggestionTypeEnum = mysqlEnum('suggestion-type', SuggestionTypeValues);

export enum TokenStandard {
  ERC_721 = 'ERC_721',
  ERC_1155 = 'ERC_1155',
}
export const TokenStandardValues = Object.values(TokenStandard) as any as ReadOnlyTuple;
export const TokenStandardEnum = mysqlEnum('token-standard', TokenStandardValues);

export enum MarketType {
  AUCTION = 'AUCTION',
  DIRECT_LISTING = 'DIRECT_LISTING',
}
export const MarketTypeValues = Object.values(MarketType) as any as ReadOnlyTuple;
export const MarketTypeEnum = mysqlEnum('market-type', MarketTypeValues);

export enum MarketStatus {
  AVAILABLE = 'AVAILABLE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  SUCCESS = 'SUCCESS',
}
export const MarketStatusValues = Object.values(MarketStatus) as any as ReadOnlyTuple;
export const MarketStatusEnum = mysqlEnum('market-status', MarketStatusValues);

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
export const ActivityTypeEnum = mysqlEnum('activity-type', ActivityTypeValues);

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}
export const GenderValues = Object.values(Gender) as any as ReadOnlyTuple;
export const GenderEnum = mysqlEnum('gender', GenderValues);
