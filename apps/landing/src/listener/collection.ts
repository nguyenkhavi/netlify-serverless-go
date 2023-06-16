//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { Decimal } from 'decimal.js';
import { ContractEventNames, parseJson } from '_@landing/utils/constants';
import { ContractEvent, NFTCollection, ThirdwebSDK } from '@thirdweb-dev/react';
import {
  IChain,
  ICollection,
  IDefaultRoyalties,
  IMetadata,
  INewProxyDeployed,
  NFTType,
} from '_@landing/utils/type';
//RELATIVE MODULES
import { addCollection } from '../services';

export async function handleNewCollections(
  sdk: ThirdwebSDK,
  metadata: IMetadata,
  appURI: any,
  collectionContract: NFTCollection,
  chain: IChain,
  db: IDBPDatabase<unknown>,
  event: ContractEvent<INewProxyDeployed>,
) {
  const royalties = await collectionContract.royalties.getDefaultRoyaltyInfo();
  const data: ICollection = {
    address: event.data.proxy,
    chain: chain.chainId,
    owner: event.data.deployer,
    category: appURI?.category || 1,
    name: metadata.name as string,
    type: NFTType.ERC721,
    metadata: metadata,
    royalty: new Decimal(royalties.seller_fee_basis_points).div(10000).toNumber(),
    royaltyRecipient: royalties.fee_recipient,
  };

  await addCollection(db, data);
  sdk.emit(ContractEventNames.newCollections, event.data.proxy);
}
