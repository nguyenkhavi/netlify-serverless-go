//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { ContractEventNames, parseJson } from '_@landing/utils/constants';
import { ContractEvent, NFTCollection, ThirdwebSDK } from '@thirdweb-dev/react';
import { IChain, ICollection, IMetadata, INewProxyDeployed, NFTType } from '_@landing/utils/type';
//RELATIVE MODULES
import { addCollection } from '../services';

export async function handleNewCollections(
  sdk: ThirdwebSDK,
  metadata: IMetadata,
  appURI: any,
  chain: IChain,
  db: IDBPDatabase<unknown>,
  event: ContractEvent<INewProxyDeployed>,
) {
  const data: ICollection = {
    address: event.data.proxy,
    chain: chain.chainId,
    owner: event.data.deployer,
    category: appURI?.category || 1,
    name: metadata.name as string,
    type: NFTType.ERC721,
    metadata: metadata,
  };

  await addCollection(db, data);
  sdk.emit(ContractEventNames.newCollections, event.data.proxy);
}
