'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { Chains, Tokens } from '_@landing/utils/constants';
import { dialogMyItemCardStore } from '_@landing/stores/dialogStore';
import {
  useAddress,
  useCancelDirectListing,
  useChainId,
  useContract,
  useCreateDirectListing,
  useSDK,
  useSigner,
} from '@thirdweb-dev/react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
//SHARED
import { toastAction } from '_@shared/stores/toast/toastStore';
//RELATIVE MODULES
import { ListingProps } from './type';

const schema = z.object({
  price: z
    .string()
    .nonempty('Price is required')
    .superRefine((val, ctx) => {
      if (!Number(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          message: 'Price must be a number',
          expected: 'number',
          received: typeof val,
        });
      } else if (Number(val) < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          message: 'Price must be greater than 0',
          minimum: 0,
          type: 'number',
          inclusive: true,
        });
      }
    }),
});
type FormValues = z.infer<typeof schema>;

export default function SellItem({ tokenId, assetContract }: ListingProps) {
  const queryClient = useQueryClient();
  const { hideDialog } = dialogMyItemCardStore();
  const chainId = useChainId();
  const sdk = useSDK();
  const signer = useSigner();
  const address = useAddress();
  const chain =
    Object.values(Chains).find((chain) => chain.chainId == chainId?.toString()) || Chains.sepolia;
  const { contract } = useContract(chain.marketContract, 'marketplace-v3');
  const { contract: nftContract } = useContract(assetContract, 'nft-collection');
  const { mutateAsync: createListing, isLoading } = useCreateDirectListing(contract);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = form;

  const _onsubmit = async (values: FormValues) => {
    const isReturn =
      !chain ||
      !sdk ||
      !signer ||
      tokenId == undefined ||
      !assetContract ||
      !createListing ||
      !nftContract ||
      !address;
    if (isReturn) return;
    try {
      const busd = Object.values(Tokens).find((token) => token.symbol == 'BUSD');
      const tx = await createListing({
        tokenId: tokenId,
        pricePerToken: values.price,
        assetContractAddress: assetContract,
        currencyContractAddress: busd?.address,
      });
      queryClient.invalidateQueries(['getItemByOwner']);
      toastAction.openToast('Listing NFT success', 'success');
    } catch (e) {
      console.log(e);
    }
    hideDialog();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(_onsubmit)}>
        <h2 className="text-body2 md:text-h6">Sell This NFT</h2>
        <p className="mt-1 text-body1 text-text-50">Enter the price of your NFT.</p>
        <FormItem name="price" label="" className="mt-4">
          <FormInput
            placeholder="Enter price"
            className="input-md"
            trailingComponent={<span className="text-subtitle2 text-text-20">BUSD</span>}
          />
        </FormItem>
        <div className="mt-4 grid grid-cols-2 gap-2 md:gap-4">
          <Button disabled={isLoading} className="btnmd" variant="outlined" onClick={hideDialog}>
            Cancel
          </Button>
          <Button isLoading={isLoading} className="btnmd" type="submit">
            Sell
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
