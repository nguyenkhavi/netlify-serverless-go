'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import Decimal from 'decimal.js';
import { useEffect, useMemo, useState } from 'react';
import { nextApi } from '_@landing/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Root } from '@radix-ui/react-radio-group';
import { Chains } from '_@landing/utils/constants';
import { TDataCheckout } from '_@landing/utils/type';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import { getMarketDetailByListingId } from '_@landing/services';
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
import { useAddress, useBuyDirectListing, useContract, useSDKChainId } from '@thirdweb-dev/react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import RadioItem from '../cart/components/RadioItem';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
//SHARED
import CardIcon from '_@shared/icons/CardIcon';
import WalletIcon from '_@shared/icons/WalletIcon';
import CheckCircleIcon from '_@shared/icons/CheckCircleIcon';
import { SkeLine, SkeParagraph } from '_@landing/components/skeleton/skeleton';
import { toastAction } from '_@shared/stores/toast/toastStore';
import { IDBPDatabase } from 'idb';
import delay from '_@landing/utils/delay';

const schema = z.object({
  walletId: z.string().nonempty('This field is required'),
  type: z.string(),
});

type FormValues = z.infer<typeof schema>;

const getCart = async (itemId: string, db: IDBPDatabase<unknown> | null) => {
  try {
    if (!itemId) {
      return delay(
        () => JSON.parse(window.localStorage.getItem('cart') || '[]') as TDataCheckout[],
        500,
      );
    } else if (typeof itemId !== 'undefined' && db) {
      return delay(
        async () => [await getMarketDetailByListingId(db, +itemId)] as TDataCheckout[],
        500,
      );
    } else {
      return delay(async () => [] as TDataCheckout[], 500);
    }
  } catch (error: any) {
    console.log(error);
    toastAction.openToast(error.message || 'Something went wrong', 'error');
  }
};

export default function CheckOutPage() {
  const queryParams = useSearchParams();
  const itemId = queryParams.get('item') || '';
  const [loading, setLoading] = useState(false);
  const address = useAddress();
  const { user } = useAuthStore();
  const chainId = useSDKChainId();
  const { db } = useIndexedDBContext();
  const chain = Object.values(Chains).find((chain) => chain.chainId == chainId?.toString());
  const { contract: marketContract } = useContract(chain?.marketContract, 'marketplace-v3');
  const { mutateAsync: buyNow } = useBuyDirectListing(marketContract);
  const { mutateAsync: purchaseSuccess } = nextApi.purchaseSuccess.useMutation();
  const { data = [], isLoading } = useQuery({
    queryKey: ['marketplace', 'checkout', db, itemId],
    queryFn: () => getCart(itemId, db),
    refetchOnWindowFocus: false,
  });

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { walletId: '', type: 'wallet' },
  });
  const { control, handleSubmit } = methods;

  const [price] = useMemo(() => {
    const dataOrder = data.reduce(
      (total, currentItem) => {
        const price = new Decimal(currentItem.price * currentItem.quantity);
        return { price: price.add(total.price).toNumber() };
      },
      { price: 0 },
    );
    return [dataOrder.price];
  }, [data]);

  const currency = useMemo(() => {
    if (data.length === 0) return '';
    return data[0]?.token?.symbol || '';
  }, [data]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const p = [];
    for (const item of data) {
      try {
        const result = await buyNow({
          listingId: item.listingId.toString(),
          quantity: item.quantity,
          buyer: values.walletId || address || '',
        });
        if (result.receipt.status == 1) {
          p.push(
            purchaseSuccess({
              orderNumber: item.listingId.toString(),
              numberOfUnits: item.quantity,
              totalAmount: new Decimal(item.quantity).mul(item.price).toNumber(),
              fromUserAddress: item.listingCreator,
            }),
          );
        }
      } catch (error: any) {
        toastAction.openToast(error.reason || error.message || 'Something went wrong', 'error');
        console.log(error);
      }
    }
    try {
      await Promise.allSettled(p);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    methods.setValue('walletId', user.profile.wallet);
  }, [user, methods]);

  return (
    <section
      className={classcat([
        'grid px-[--px] pb-6 xlg:gap-8 xlg:pb-24 xlg:pt-10',
        'xlg:grid-cols-[1fr_theme(spacing[135.5])]',
        'gap-6',
      ])}
    >
      <div className="xlg:col-start-2">
        {isLoading ? (
          <SummarySke />
        ) : (
          <div className="overflow-hidden rounded-lg bg-secondary-200">
            <div className={classcat(['p-6 '])}>
              <p className="text-center text-h6 xlg:text-h4">Order Summary</p>
              <ul className="mt-8 text-body3 [&_span]:block">
                <li className={classcat([itemClasses])}>
                  <span>Item(s):</span>
                  <p>{data.length}</p>
                </li>
                <li className={classcat([itemClasses])}>
                  <span>Total Before Tax:</span>
                  <div className="text-right">
                    <p className="text-text-80">{`${price} ${currency}`}</p>
                    <p>${price}</p>
                  </div>
                </li>
                <li className={classcat([itemClasses])}>
                  <span>Estimated tax to be Collected:</span>
                  <div className="text-right">
                    <p className="text-text-80">{0}</p>
                    <p>${0}</p>
                  </div>
                </li>
                <li className={classcat([itemClasses])}>
                  <p className="text-h6 text-primary">Order total:</p>
                  <div className="text-right">
                    <p className="text-h6 text-primary">{`${price} ${currency}`}</p>
                    <p className="text-body2 text-text-50">${price}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="h-14 bg-text-10"></div>
          </div>
        )}

        <HomeAdvVertical
          className="relative h-auto w-full py-8 ow:top-6 ow:px-15 ow:xlg:grid"
          btnClasses="ow:static mt-6.25"
        />
      </div>
      <div className="xlg:col-start-1 xlg:row-start-1">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <FormItem
              name="walletId"
              label="Do you want to send your NFT to a different wallet?"
              labelClasses={'text-body2'}
            >
              <FormInput className="h-16.25 ow:border-text-80 ow:px-4 ow:text-text-20" />
            </FormItem>
            <div className="overflow-hidden rounded-lg bg-secondary-200">
              <div className="flex border-b-[0.5px] border-text-20 p-4 xlg:p-6">
                <CheckCircleIcon className="mr-2 h-6 w-6 text-primary" />
                <p className="text-body2 xlg:text-h6">Choose a payment method</p>
              </div>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Root {...field} onValueChange={field.onChange}>
                    <div className="border-b-[0.5px] border-text-20 p-6">
                      <p className="mb-8 text-h6 text-text-80">Pay with Wallet</p>
                      <RadioItem
                        value="wallet"
                        icon={<WalletIcon />}
                        label="Pay with wallet"
                        valueSelect={methods.getValues('type')}
                      />
                    </div>
                    <div className="p-6">
                      <p className="mb-8 text-h6 text-text-80">Pay with card</p>
                      <RadioItem
                        value="card"
                        icon={<CardIcon />}
                        label="Pay with card"
                        valueSelect={methods.getValues('type')}
                      />
                    </div>
                  </Root>
                )}
              />
            </div>
            <Button
              disabled={isLoading || data.length === 0}
              isLoading={loading}
              className="btnlg ow:h-15 xlg:w-118.5 xlg:ow:h-16.25"
              type="submit"
            >
              Proceed to payment
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}

const itemClasses = [
  'flex justify-between',
  'not-last:mb-4 [&>*:last-child]:text-text-50',
  '[&>span:first-child]:text-body3 xlg:[&>span:first-child]:text-body1 [&>span:first-child]:text-text-80',
];

const SummarySke = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-secondary-200">
      <div className="p-6 h-82">
        <SkeLine className="ow:w-44.5 mx-auto ow:h-9" />
        <div className="mt-8 text-body3 [&_span]:block">
          <SkeParagraph />
          <SkeLine className="ow:w-[70%] mx-auto ow:my-10" />
          <SkeParagraph />
        </div>
      </div>
      <div className="h-14 bg-text-10" />
    </div>
  );
};
