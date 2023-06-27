'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import NFTABI from '_@landing/utils/NFTABI';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useSDK, useSigner } from '@thirdweb-dev/react';
import { useTransferNFT, useContract } from '@thirdweb-dev/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { dialogMyItemCardStore } from '_@landing/stores/dialogStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
//SHARED
import { toastAction } from '_@shared/stores/toast/toastStore';
//RELATIVE MODULES
import { NFTDataProps } from './type';

const schema = z.object({
  isTransfer: z.boolean(),
  walletId: z.string().nonempty('This field is required!'),
});
type FormValues = z.infer<typeof schema>;

export default function TransferNFT({ assetContract, tokenId }: NFTDataProps) {
  const queryClient = useQueryClient();
  const { hideDialog } = dialogMyItemCardStore();
  const sdk = useSDK();
  const { contract } = useContract(assetContract, 'nft-collection');
  const { mutateAsync: transfer, isLoading } = useTransferNFT(contract);

  const signer = useSigner();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      isTransfer: false,
      walletId: '',
    },
  });
  const { handleSubmit, control, watch } = form;

  const _onsubmit = async (values: FormValues) => {
    if (!sdk || !signer || !assetContract || tokenId == undefined || !transfer) return;
    await transfer({ to: values.walletId, tokenId });
    queryClient.invalidateQueries(['getItemByOwner']);
    toastAction.openToast('Transfer NFT success', 'success');
    hideDialog();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(_onsubmit)}>
        <h2 className="text-body2 md:text-h6">Transfer NFT</h2>
        <p className="mt-1 text-body3 text-text-50 md:text-body1">
          You can transfer tokens from your address to another
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p>Send to</p>
          <div className="flex">
            <Controller
              control={control}
              name="isTransfer"
              render={({ field: { onChange } }) => (
                <>
                  <Button
                    className={classcat(['btnmd ow:h-10 ow:w-26 md:ow:w-34.5', 'mr-1 md:mr-2'])}
                    variant={watch('isTransfer') ? 'filled' : 'outlined'}
                    onClick={() => onChange(true)}
                    type="button"
                  >
                    Transfer
                  </Button>
                  <Button
                    className="btnmd ow:h-10 ow:w-26 md:ow:w-34.5"
                    variant={!watch('isTransfer') ? 'filled' : 'outlined'}
                    onClick={() => onChange(false)}
                    type="button"
                  >
                    Fleamint user
                  </Button>
                </>
              )}
            />
          </div>
        </div>
        <FormItem name="walletId" label="" className="mt-4">
          <FormInput placeholder="Please enter wallet address" className="input-md" />
        </FormItem>
        <div className="mt-10 flex justify-end">
          <Button isLoading={isLoading} className="btnmd ow:w-34.5" type="submit">
            Transfer
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
