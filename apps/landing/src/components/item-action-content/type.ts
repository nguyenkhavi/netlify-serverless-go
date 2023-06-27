export type NFTDataProps = {
  assetContract: string;
  tokenId: number;
};

export type ListingProps = {
  listingId: number | undefined;
  tokenId: number | undefined;
  assetContract: string | undefined;
};
