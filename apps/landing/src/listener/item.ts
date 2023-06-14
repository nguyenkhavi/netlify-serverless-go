//THIRD PARTY MODULES
import { constants } from 'ethers';
import { IDBPDatabase } from 'idb';
import { dbIndex, dbOS } from '_@landing/utils/constants';
import { ContractEvent, ThirdwebSDK } from '@thirdweb-dev/react';
import {
  ActivityType,
  IActivity,
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
  addActivity,
  addItem,
  getCollectionByContract,
  getMarketStatusByListingId,
  getAllRawMarketsByItem,
  updateItem,
  updateMarket,
} from '../services';

export async function handleTransferItem(
  db: IDBPDatabase,
  sdk: ThirdwebSDK,
  chain: IChain,
  event: ContractEvent<ITransferEventData>,
) {
  const existedItem = await db.getFromIndex(
    dbOS.items,
    dbIndex.itemIdIndex,
    event.transaction.address + '_' + event.data.tokenId.toNumber(),
  );
  if (existedItem) {
    await updateItem(db, {
      ...existedItem,
      owner: event.data.to,
    });
  } else {
    const contract = await sdk.getContract(event.transaction.address, 'nft-collection');
    const collection: ICollection = await getCollectionByContract(db, event.transaction.address);
    const metadata = (await contract.erc721.get(event.data.tokenId)).metadata;
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
  }
  const activity: IActivity = {
    type: ActivityType.TRANSFER,
    transactionHash: event.transaction.transactionHash,
    transactionIndex: event.transaction.transactionIndex,
    blockNumber: event.transaction.blockNumber,
    assetContract: event.transaction.address,
    itemId: event.transaction.address + '_' + event.data.tokenId.toNumber(),
    tokenId: event.data.tokenId.toNumber(),
    price: 0,
    quantity: 1,
    fromAddress: event.data.from,
    toAddress: event.data.to,
    chain: chain.chainId,
  };

  await addActivity(db, activity);

  /// check market available?
  const market: IMarketData[] = await getAllRawMarketsByItem(
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

      const activity: IActivity = {
        type: ActivityType.CANCELED_LISTING,
        transactionHash: event.transaction.transactionHash,
        transactionIndex: event.transaction.transactionIndex,
        blockNumber: event.transaction.blockNumber,
        assetContract: mk.assetContract,
        itemId: mk.assetContract + '_' + mk.tokenId,
        tokenId: Number(mk.tokenId),
        listingId: mk.listingId,
        price: mk.price,
        currency: mk.currency,
        quantity: 0,
        fromAddress: mk.listingCreator,
        toAddress: constants.AddressZero,
        chain: chain.chainId,
      };
      await addActivity(db, activity);
    }
  });
}
