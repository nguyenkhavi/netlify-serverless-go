'use client';
//THIRD PARTY MODULES
import * as z from 'zod';
import classcat from 'classcat';
import { constants } from 'ethers';
import { IDBPDatabase } from 'idb';
import { ICategory } from '_@landing/utils/type';
import { Chains } from '_@landing/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useAddress, useSDK } from '@thirdweb-dev/react';
import { useCallback, useEffect, useState } from 'react';
import Input from '_@landing/app/profile/create/comps/Input';
import Select from '_@landing/app/profile/create/comps/Select';
import { getAllCategories } from '_@landing/services/category';
import Breadcrumb from '_@landing/app/profile/create/comps/Breadcrumb';
import ProfileNavMobile from '_@landing/app/profile/comps/ProfileNavMobile';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
import UploadImage from '_@landing/components/UploadImage';
import FormSwitch from '_@shared/components/switch/FormSwitch';
//SHARED
import PadlockIcon from '_@shared/icons/PadlockIcon';
import PercentIcon from '_@shared/icons/PercentIcon';
import { toastAction } from '_@shared/stores/toast/toastStore';
//HOOK
import useGetData from '_@landing/hooks/useGetData';
//RELATIVE MODULES
import './styles.css';

const values = z
  .object({
    collectionImage: z
      .string({
        required_error: 'This field is required',
      })
      .nonempty('This field is required'),
    bannerImage: z.string().optional(),
    collectionName: z.string().nonempty('This field is required'),
    url: z.string(),
    description: z.string().nonempty('This field is required'),
    category: z
      .string({
        required_error: 'This field is required',
      })
      .nonempty('This field is required'),
    blockchain: z.string(),
    createEarnings: z.string(),
    externalWallet: z.boolean(),
    walletAddress: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.externalWallet) {
        return data.walletAddress !== '';
      }
      return true;
    },
    {
      message: 'This field is required',
      path: ['walletAddress'],
    },
  );

type Values = z.infer<typeof values>;
const nameToSlug = (name: string) => name.toLowerCase().replace(/\s/g, '-');
export default function CreateCollectionPage() {
  const methods = useForm<Values>({
    mode: 'onChange',
    resolver: zodResolver(values),
    defaultValues: {
      externalWallet: false,
      blockchain: Chains['sepolia'].chainId,
    },
  });
  const { handleSubmit, setValue, watch } = methods;
  const sdk = useSDK();
  const address = useAddress();
  const [loading, setLoading] = useState(false);

  const getDataCollection = useCallback((db: IDBPDatabase) => {
    return getAllCategories(db).catch(() => [] as ICategory[]);
  }, []);
  const { data = [] } = useGetData(getDataCollection);

  function generateSymbol(name: string): string {
    const words: string[] = name.split(' ');
    let symbol = '';
    words.forEach((word: string, index: number) => {
      if (index === 0) {
        symbol += word.toLowerCase();
      } else {
        symbol += word.charAt(0).toUpperCase() + word.slice(1);
      }
    });
    return symbol;
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const appUri = { app: 'Fleamint', category: data.category };
      await sdk?.deployer.deployNFTCollection({
        name: data.collectionName,
        description: data.description,
        image: data.collectionImage,
        external_link: `https://fleamint.com/marketplace/collection/${data.url}`,
        symbol: generateSymbol(data.collectionName),
        primary_sale_recipient: address || constants.AddressZero,
        fee_recipient: data.walletAddress,
        seller_fee_basis_points: Number(data.createEarnings),
        app_uri: JSON.stringify(appUri),
      });
      toastAction.openToast('Create collection successfully', 'success');
    } catch (error: any) {
      toastAction.openToast(error.reason || error.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  });

  const collectionName = watch('collectionName');

  useEffect(() => {
    if (collectionName) {
      setValue('url', `${nameToSlug(collectionName)}`);
    }
  }, [collectionName, setValue]);

  return (
    <div className="grid gap-6">
      <ProfileNavMobile isBorder={false} title="My Items" />
      <div className="create-collection grid">
        <Breadcrumb
          paths={[
            {
              name: 'My Collections',
              href: '/profile/my-items',
            },
            {
              name: 'Create a Collection',
              href: '/profile/create/collection',
            },
          ]}
        />
        <FormProvider {...methods}>
          <form
            onSubmit={onSubmit}
            className={classcat([
              'px-3.75 pb-5.75 pt-3.75 md:p-5.75',
              'border-[0.5px] border-[#18181A]',
              'rounded-[10px] bg-secondary-200',
              'lg:max-w-[theme(spacing[180.5])]',
            ])}
          >
            <div className="grid gap-10">
              <div className="grid gap-4 md:gap-6">
                <h3 className="text-h3 text-primary-700 md:text-h2">Create a Collection</h3>
                <div className="grid gap-6">
                  <p className="text-body3">
                    <span className="text-error">*</span>{' '}
                    <span className=" text-text-50">Required fields</span>
                  </p>

                  <div className="grid gap-6">
                    {[
                      {
                        title: 'Collection Image',
                        description: `This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of Fleamint. 600 x 400 recommended.`,
                        imageClasses: 'w-62 ow:h-32.5',
                        required: true,
                        name: 'collectionImage',
                      },
                      {
                        title: 'Banner image',
                        description: `This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 350 recommended.`,
                        imageClasses: 'max-w-[theme(spacing[110.5])] w-full ow:h-32.5',
                        name: 'bannerImage',
                      },
                    ].map((item) => (
                      <section key={item.title}>
                        <div className="grid gap-4">
                          <div className="grid gap-1">
                            <h5 className="title">
                              {item.title}
                              {item.required && <span className="text-error">*</span>}
                            </h5>
                            <p className="description">{item.description}</p>
                          </div>
                          <UploadImage
                            onChangeValue={(src) => {
                              setValue(item.name as any, src);
                            }}
                            className={item.imageClasses}
                          />
                        </div>
                      </section>
                    ))}

                    {[
                      {
                        title: 'Collection name',
                        description: '',
                        name: 'collectionName',
                        placeholder: 'Example: tenure of the sea',
                        required: true,
                      },
                      {
                        title: 'URL',
                        description:
                          'Set your collection URL for Fleamint. This would create a custom link for your collection',
                        name: 'url',
                        placeholder: 'enter-your-value',
                        leadingComponent: (
                          <span className="text-text-50">
                            https//:fleamint.com/marketplace/collection/
                          </span>
                        ),
                      },
                      {
                        title: 'Description',
                        description: 'Write a description of your collection',
                        name: 'description',
                        placeholder: 'Write description....',
                        type: 'textarea',
                        required: true,
                      },
                    ].map((value) => (
                      <Input
                        inputProps={{
                          leadingComponent: value.leadingComponent,
                          ...(value.type === 'textarea' && {
                            containerClasses: 'h-27',
                            className: 'h-full',
                          }),
                        }}
                        key={value.title}
                        title={value.title}
                        description={value.description}
                        name={value.name}
                        placeholder={value.placeholder}
                        type={value.type}
                        required={value.required}
                      />
                    ))}

                    {[
                      {
                        title: 'Category',
                        description: 'Select the category your collection falls under',
                        name: 'category',
                        placeholder: 'Select the catagory',
                        data: Object.values(data).map((value) => ({
                          label: value.name,
                          value: String(value.id),
                          image: process.env.NEXT_PUBLIC_IPFS_GATE_WAY + value.image,
                        })),
                        required: true,
                      },
                      {
                        title: 'Blockchain',
                        description: descriptionBlockchain,
                        name: 'blockchain',
                        placeholder: 'Select the blockchain',
                        data: Object.values(Chains).map((value) => ({
                          label: value.networkName,
                          value: value.chainId,
                          image: value.icon,
                        })),
                      },
                    ].map((item) => (
                      <Select
                        key={item.title}
                        title={item.title}
                        description={item.description}
                        name={item.name}
                        placeholder={item.placeholder}
                        data={item.data}
                        required={item.required}
                        selectProps={{
                          triggerRender: (selectedValue: {
                            value: string;
                            label: string;
                            image: string;
                          }) => (
                            <div className="flex items-center space-x-2 ">
                              <img
                                className="h-6 w-6 object-cover"
                                src={selectedValue.image}
                                alt={selectedValue.label}
                              />
                              <span>{selectedValue.label}</span>
                            </div>
                          ),
                        }}
                      />
                    ))}

                    <div className="grid gap-8 rounded-lg border border-text-10 p-3.75 md:p-5.75">
                      <FormItem
                        label={
                          <p className="text-body2 text-white md:text-h5-bold">Create earnings</p>
                        }
                        name="createEarnings"
                      >
                        <FormInput
                          className="input-md"
                          trailingComponent={<PercentIcon />}
                          placeholder="10"
                        />
                      </FormItem>
                      <div className="grid gap-1">
                        <div className="flex items-center justify-between space-x-6">
                          <div className="flex max-w-[483px] space-x-2">
                            <PadlockIcon className="shrink-0" />
                            <div className="grid gap-1">
                              <h5 className="text-h6 text-primary-700">External wallet</h5>
                              <p className="text-body2 text-text-50">
                                Toggle this on if you would like to send your creator earnings to an
                                external wallet address.
                              </p>
                            </div>
                          </div>
                          <FormSwitch name="externalWallet" className="shrink-0" />
                        </div>
                        <Show when={watch('externalWallet')}>
                          <Input
                            name="walletAddress"
                            placeholder="Wallet address"
                            title=""
                            labelClasses="hidden"
                          />
                        </Show>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button isLoading={loading} type="submit" className="btnlg ow:w-full ow:md:w-62.5">
                Create
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

const descriptionBlockchain =
  "Select the blockchain where you'd like new items from this collection to be added by default.";
