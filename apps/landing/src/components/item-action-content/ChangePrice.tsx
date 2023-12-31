'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { Chains } from '_@landing/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useChainId, useSDK, useSigner } from '@thirdweb-dev/react';
import { dialogMyItemCardStore } from '_@landing/stores/dialogStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
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

export default function ChangePrice({ listingId, tokenId, assetContract }: ListingProps) {
  const queryClient = useQueryClient();
  const { hideDialog } = dialogMyItemCardStore();
  const chainId = useChainId();
  const sdk = useSDK();
  const signer = useSigner();
  const chain =
    Object.values(Chains).find((chain) => chain.chainId == chainId?.toString()) || Chains.sepolia;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = form;

  const _onsubmit = async (values: FormValues) => {
    const isReturn =
      !chain || !sdk || !signer || listingId == undefined || tokenId == undefined || !assetContract;
    if (isReturn) return;
    const marketContract = await sdk.getContract(chain.marketContract, 'marketplace-v3');
    await marketContract.directListings.updateListing(new Decimal(listingId).toHex(), {
      tokenId: BigNumber.from(new Decimal(tokenId).toHex()),
      assetContractAddress: assetContract,
      pricePerToken: values.price,
    });
    queryClient.invalidateQueries(['getItemByOwner']);
    hideDialog();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(_onsubmit)}>
        <h2 className="text-body2 md:text-h6">Change Price</h2>
        <p className="mt-1 text-body1 text-text-50">
          it is advised that you reduce the price of your NFT.
        </p>
        <FormItem name="price" label="" className="mt-4">
          <FormInput
            placeholder="Enter new price"
            className="input-md"
            trailingComponent={<span className="text-subtitle2 text-text-20">BUSD</span>}
          />
        </FormItem>
        <div className="mt-4 grid grid-cols-2 gap-2 md:gap-4">
          <Button className="btnmd" variant="outlined" onClick={hideDialog}>
            Cancel
          </Button>
          <Button className="btnmd" type="submit">
            Change Price
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
