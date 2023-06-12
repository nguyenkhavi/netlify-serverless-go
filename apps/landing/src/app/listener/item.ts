//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { constants } from 'ethers';
import { ContractEvent, NFTMetadata, ThirdwebSDK } from '@thirdweb-dev/react';
import {
  IChain,
  ICollection,
  IItem,
  IMarketData,
  IMarketStatusData,
  IMetadataNFT,
  ITransferEventData,
  NFTType,
} from '_@landing/utils/type';
//RELATIVE MODULES
import {
  addItem,
  getCollectionByContract,
  getMarketStatusByListingId,
  getMarketsByItem,
  updateMarket,
} from '../services';

export async function handleTransferItem(
  db: IDBPDatabase,
  sdk: ThirdwebSDK,
  chain: IChain,
  event: ContractEvent<ITransferEventData>,
) {
  const contract = await sdk.getContract(event.transaction.address, 'nft-collection');
  const collection: ICollection = await getCollectionByContract(db, event.transaction.address);
  const metadata = await (await contract.erc721.get(event.data.tokenId)).metadata;
  const data: IItem = {
    address: event.transaction.address,
    tokenId: event.data.tokenId.toNumber(),
    chain: chain.chainId,
    owner: event.data.to,
    category: collection.category,
    name: metadata.name as string,
    type: NFTType.ERC721,
    metadata: metadata as unknown as IMetadataNFT,
    // id = address_tokenId, for getByIndex
    id: event.transaction.address + '_' + event.data.tokenId.toNumber(),
  };
  /// if item existed => update owner to toAddress
  await addItem(db, data);

  /// check market available?
  const market: IMarketData[] = await getMarketsByItem(
    db,
    event.transaction.address + '_' + event.data.tokenId.toNumber(),
  );

  market.map(async (mk) => {
    const status: IMarketStatusData = await getMarketStatusByListingId(db, mk.listingId);
    if (status.isAvailable == 1) {
      await updateMarket(db, {
        listingId: mk.listingId,
        isAvailable: 0,
        isBought: 0,
        isCanceled: 1,
      });
    }
  });
}
