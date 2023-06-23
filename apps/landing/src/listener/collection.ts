//THIRD PARTY MODULES
import { constants } from 'ethers';
import { IDBPDatabase } from 'idb';
import { Decimal } from 'decimal.js';
import { ContractEventNames, maxRetries } from '_@landing/utils/constants';
import { ContractEvent, NFTCollection, ThirdwebSDK } from '@thirdweb-dev/react';
import { IChain, ICollection, IMetadata, INewProxyDeployed, NFTType } from '_@landing/utils/type';
//RELATIVE MODULES
import { addCollection } from '../services';

export async function handleNewCollections(
  metadata: IMetadata | null,
  appURI: any,
  collectionContract: NFTCollection,
  chain: IChain,
  db: IDBPDatabase<unknown>,
  event: ContractEvent<INewProxyDeployed>,
) {
  try {
    const royalties = await fetchRoyalties(collectionContract);
    const data: ICollection = {
      address: event.data.proxy,
      chain: chain.chainId,
      owner: event.data.deployer,
      category: appURI?.category || 1,
      name: metadata?.name as string,
      type: NFTType.ERC721,
      metadata: metadata || {
        name: '',
        description: '',
        image: '',
        seller_fee_basis_points: 0,
        fee_recipient: '0',
        symbol: '',
        app_uri: '',
      },
      royalty: new Decimal(royalties.seller_fee_basis_points).div(10000).toNumber(),
      royaltyRecipient: royalties.fee_recipient,
    };
    await addCollection(db, data);
  } catch (e) {
    console.log(e);
  }
}

export async function getCollectionMetadata(sdk: ThirdwebSDK, proxy: string, chain: IChain) {
  let retries = 0;

  async function retrieveData(sdk: ThirdwebSDK) {
    try {
      const collectionContract = await sdk.getContract(proxy, 'nft-collection');
      const metadata: IMetadata = await collectionContract.app.metadata.get();
      return { collectionContract, metadata };
    } catch (error) {
      retries++;
      if (retries <= maxRetries) {
        const sdk = new ThirdwebSDK(chain.rpc);
        return retrieveData(sdk);
      } else {
        return { collectionContract: null, metadata: null };
      }
    }
  }

  return retrieveData(sdk);
}

export async function fetchAllNFTOwners(
  collectionContract: NFTCollection,
  proxy: string,
  chain: IChain,
  start: number,
  count: number,
) {
  let retries = 0;

  async function retrieveData(collectionContract: NFTCollection) {
    try {
      const nftOwners = await collectionContract.erc721.getAll({
        start: start,
        count: count,
      });
      return nftOwners;
    } catch (error) {
      retries++;
      if (retries <= maxRetries) {
        const sdk = new ThirdwebSDK(chain.rpc);
        const _collectionContract = await sdk.getContract(proxy, 'nft-collection');
        return retrieveData(_collectionContract);
      } else {
        return [];
      }
    }
  }

  return retrieveData(collectionContract);
}

export async function fetchCountNFT(
  collectionContract: NFTCollection,
  proxy: string,
  chain: IChain,
) {
  let retries = 0;

  async function retrieveData(collectionContract: NFTCollection) {
    try {
      const total = (await collectionContract.erc721.totalCount()).toNumber();
      return total;
    } catch (error) {
      retries++;
      if (retries <= maxRetries) {
        const sdk = new ThirdwebSDK(chain.rpc);
        const _collectionContract = await sdk.getContract(proxy, 'nft-collection');
        return retrieveData(_collectionContract);
      } else {
        return 0;
      }
    }
  }

  return retrieveData(collectionContract);
}

export async function fetchRoyalties(collectionContract: NFTCollection) {
  async function retrieveData(collectionContract: NFTCollection) {
    try {
      const royalties = await collectionContract.royalties.getDefaultRoyaltyInfo();
      return royalties;
    } catch (error) {
      return {
        seller_fee_basis_points: 0,
        fee_recipient: constants.AddressZero,
      };
    }
  }

  return retrieveData(collectionContract);
}
