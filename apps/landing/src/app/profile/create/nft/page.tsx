'use client';
//THIRD PARTY MODULES
import * as z from 'zod';
import dayjs from 'dayjs';
import classcat from 'classcat';
import { useState } from 'react';
import { constants } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { Chains } from '_@landing/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import Breadcrumb from '_@landing/app/profile/create/comps/Breadcrumb';
import ProfileNavMobile from '_@landing/app/profile/comps/ProfileNavMobile';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
import { getCollectionByContract, getCollectionsByOwner } from '_@landing/services';
import {
  useAddress,
  useContract,
  useCreateDirectListing,
  useSDK,
  useSDKChainId,
  useSigner,
} from '@thirdweb-dev/react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import UploadImage from '_@landing/components/UploadImage';
import FormSwitch from '_@shared/components/switch/FormSwitch';
//SHARED
import PadlockIcon from '_@shared/icons/PadlockIcon';
import { getErrorMessage } from '_@shared/utils/func';
import RoundListIcon from '_@shared/icons/RoundListIcon';
import FixedOfferIcon from '_@shared/icons/FixedOfferIcon';
import { toastAction } from '_@shared/stores/toast/toastStore';
//RELATIVE MODULES
import './styles.css';
import Group from '../comps/Group';
import Select from '../comps/Select';
import BaseInput, { Input } from '../comps/Input';
import AddPropertiesModal from '../comps/AddPropertiesModal';

const values = z.object({
  properties: z
    .record(
      z.object({
        type: z.string(),
        name: z.string(),
      }),
    )
    .nullish(),
  image: z
    .string({ required_error: 'This field is required' })
    .nonempty({ message: 'This field is required' }),
  name: z.string().nonempty({ message: 'This field is required' }),
  description: z.string().nonempty({ message: 'This field is required' }),
  collection: z
    .string({ required_error: 'This field is required' })
    .nonempty({ message: 'This field is required' }),
  content: z.object({
    status: z.boolean().optional(),
    value: z.string().optional(),
  }),
  supply: z.string(),
  // collectionAddressContract: z.string().nonempty({ message: 'This field is required' }),
  blockchain: z.string().nullish(),
  marketplace: z.object({
    status: z.boolean().optional(),
  }),
  price: z.string(),
  listingExpiration: z.string().nullish(),
});

type Values = z.infer<typeof values>;

const descriptionBlockChain =
  "Select the blockchain where you'd like new items from this collection to be added by default.";
export default function CreateCollectionPage() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const methods = useForm<Values>({
    resolver: zodResolver(values),
    defaultValues: {
      blockchain: Chains['sepolia'].chainId,
      supply: '1',
    },
  });
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    watch,
  } = methods;
  const collection = watch('collection');
  const price = Number(watch('price') || 0);
  const { user } = useAuthStore();
  const { db } = useIndexedDBContext();
  const sdk = useSDK();
  const signer = useSigner();
  const chainId = useSDKChainId();
  const chain = Object.values(Chains).find((chain) => chain.chainId == chainId?.toString());
  const { contract: marketContract } = useContract(chain?.marketContract, 'marketplace-v3');
  const { mutateAsync: createDirectListing } = useCreateDirectListing(marketContract);
  const address = useAddress();
  const { data: collectionsByOwner } = useQuery({
    enabled: !!user?.profile.wallet && !!db,
    queryKey: ['collectionsByOwner', user?.profile.wallet],
    queryFn: () => {
      if (!user?.profile.wallet || !db) return undefined;
      return getCollectionsByOwner(db, user.profile.wallet, {
        page: 0,
        pageSize: Number.MAX_VALUE,
      });
    },
    refetchOnWindowFocus: false,
  });

  const { data: creatorEarning = 0, isLoading: creatorEarningLoading } = useQuery({
    enabled: !!db && !!collection,
    queryKey: ['creatorEarning', collection],
    queryFn: async () => {
      if (!db || !collection) return undefined;
      const collectionData = await getCollectionByContract(db, collection);
      return collectionData.royalty;
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { data: fleamintFee = ['', 0], isLoading: fleamintFeeLoading } = useQuery({
    enabled: !!marketContract && !!collection,
    queryKey: ['fleamintFee', collection],
    queryFn: async () => {
      if (!marketContract || !collection) return undefined;
      return await marketContract.call('getPlatformFeeInfo', []);
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (!sdk || !signer) return;
      const contract = await sdk.getContract(data.collection, 'nft-collection');
      const metadata =
        data.content.status == true
          ? (data.content.value as string)
          : {
              name: data.name,
              description: data.description,
              image: data.image,
              attributes: Object.values(data.properties || []).map((property) => {
                return {
                  trait_type: property.type,
                  value: property.name,
                };
              }),
            };
      const tx = await contract.mint(metadata);
      const tokenId = tx.id; // the id of the NFT minted

      if (data.marketplace.status) {
        const approved = await contract.isApproved(
          address || constants.AddressZero,
          chain?.marketContract || Chains.sepolia.marketContract,
        );
        console.log({ approved });
        if (!approved) {
          await contract.setApprovalForAll(
            chain?.marketContract || Chains.sepolia.marketContract,
            true,
          );
        }
        const expiration = data.listingExpiration
          ? dayjs().add(Number(data.listingExpiration), 'day').unix()
          : undefined;
        const result = await createDirectListing({
          tokenId,
          /// pass decimal of currency here
          pricePerToken: data.price,
          assetContractAddress: data.collection,
          quantity: 1,
          endTimestamp: expiration,
        });
        console.log(`result`, result);
      }

      toastAction.openToast('Create NFT success', 'success');
    } catch (error: any) {
      toastAction.openToast(error.reason || error.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  });

  const propertiesValue = Object.values(watch('properties') || {});
  const setValuesProperties = (value: Values['properties']) => {
    setValue('properties', value);
  };
  const listingExpiration = watch('listingExpiration') || undefined;

  const totalEstimatedEarnings = price - ((creatorEarning + fleamintFee[1]) * price) / 100;

  return (
    <div className="grid gap-6">
      <ProfileNavMobile isBorder={false} title="My Items" />
      <div className="create-nft grid md:gap-3">
        <Breadcrumb
          paths={[
            {
              name: 'My Collections',
              href: '/profile/my-items',
            },
            {
              name: 'Create a Items',
              href: '/profile/create/nft',
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
              'lg:max-w-[722px]',
            ])}
          >
            <div className="grid gap-10">
              <div className="grid gap-6">
                <h3 className="text-h3 text-primary-700 md:text-h2">Create NFT</h3>
                <div className="grid gap-6">
                  <p className="text-body3">
                    <span className="text-error">*</span>{' '}
                    <span className=" text-text-50">Required fields</span>
                  </p>

                  <div className="grid gap-6">
                    <div>
                      <FormItem
                        label={
                          <div className="grid gap-1">
                            <h5 className="title">
                              Image
                              <span className="text-error">*</span>
                            </h5>
                            <p className="description">
                              File types supported: JPG, PNG, GIF, SVG. Max size: 30 MB
                            </p>
                          </div>
                        }
                        name="image"
                      >
                        <div className="mt-3 grid gap-1">
                          <UploadImage
                            onChangeValue={(value) => {
                              setValue('image', value);
                            }}
                            className="w-62 md:h-32.5"
                          />
                        </div>
                      </FormItem>
                    </div>
                    {[
                      {
                        title: 'Name',
                        description: '',
                        name: 'name',
                        placeholder: 'Item name',
                        required: true,
                      },
                      {
                        title: 'Description',
                        description:
                          "The description will be included on the item's detail page underneath its image.",
                        name: 'description',
                        placeholder: 'Write description',
                        type: 'textarea',
                        required: true,
                      },
                    ].map((value) => (
                      <BaseInput
                        key={value.name}
                        title={value.title}
                        name={value.name}
                        description={value.description}
                        placeholder={value.placeholder}
                        type={value.type}
                        required={value.required}
                        inputProps={{
                          ...(value.type === 'textarea' && {
                            containerClasses: 'h-27',
                            className: 'h-full',
                          }),
                        }}
                      />
                    ))}
                    <Select
                      title="Collection"
                      description="Do you want to add this item to a collection?Select collection below"
                      name="collection"
                      data={collectionsByOwner?.data.map((item) => ({
                        label: item.name,
                        value: item.address,
                      }))}
                      selectProps={{}}
                      placeholder="Select collection"
                      required
                    />
                    <Group
                      title="Unlockable Content"
                      description="Content will be unlocked after successful transaction"
                      actionRender={
                        <div className="grid place-content-center">
                          <FormSwitch name="content.status" />
                        </div>
                      }
                      icon={<PadlockIcon />}
                    >
                      <Show when={watch('content.status')}>
                        <Input
                          title=""
                          name={'content.value'}
                          placeholder="Digital key, link to a file....."
                        />
                      </Show>
                    </Group>
                    <Group
                      title="Properties"
                      description="Textual traits that show up as rectangles"
                      actionRender={
                        <div className="grid h-full items-center">
                          <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="relative h-7.5 w-7.5 shrink-0 rounded-[5px] bg-secondary-300"
                          >
                            <div
                              className={classcat([
                                'before:absolute before:left-1/2 before:top-1/2 before:h-3.5 before:w-[1.5px] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-text-60',
                                'after:absolute after:left-1/2 after:top-1/2 after:h-[1.5px] after:w-3.5 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-text-60',
                              ])}
                            ></div>
                          </button>
                        </div>
                      }
                      icon={<RoundListIcon />}
                    >
                      <Show when={propertiesValue.length > 0}>
                        <div className="mt-3 flex gap-4">
                          {propertiesValue?.map((value: any) => (
                            <PropertyItem key={value.name} name={value.name} type={value.type} />
                          ))}
                        </div>
                      </Show>
                    </Group>
                    <BaseInput
                      title="Supply"
                      name="supply"
                      inputProps={{
                        disabled: true,
                      }}
                      description="The number of items that can be minted. No gas cost to you"
                      placeholder="Enter number"
                    />
                    <Select
                      title="Blockchain"
                      name="blockchain"
                      description={descriptionBlockChain}
                      data={Object.values(Chains).map((value) => ({
                        label: value.networkName,
                        value: value.chainId,
                        image: value.icon,
                      }))}
                      placeholder="Select blockchain"
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
                    <div className="grid gap-6 md:gap-px md:rounded-[10px] md:border md:border-text-10 md:pb-5.75">
                      <Group
                        title="List on Marketplace"
                        description="Enter price to allow users instantly purchase your NFT"
                        className="md:border-none"
                        actionRender={
                          <div className="grid h-full items-center md:items-start">
                            <FormSwitch name="marketplace.status" />
                          </div>
                        }
                      >
                        <div className="grid gap-4">
                          <div className="border-green-gradient mt-3 grid h-41.25 w-full place-content-center md:max-w-[284px]">
                            <div className="grid gap-1.5 text-center">
                              <FixedOfferIcon className="mx-auto" />
                              <span className="text-green-gradient w-17.5">Fixed Price</span>
                            </div>
                          </div>
                        </div>
                      </Group>
                      <div className="grid gap-6 md:px-5.75">
                        <BaseInput
                          inputProps={{ trailingComponent: <>BUSD</> }}
                          title="Price"
                          name="price"
                          placeholder='Enter price, e.g. "1.5"'
                        />

                        <Select
                          title="Listing expiration"
                          name="listingExpiration"
                          placeholder="Listing expiration"
                          data={expirationList}
                        >
                          <Show when={!getErrorMessage('listingExpiration', errors)}>
                            {listingExpiration ? (
                              <p className="text-body3 text-text-50">
                                Expiration at{' '}
                                {dayjs()
                                  .add(Number(watch('listingExpiration')), 'day')
                                  .format('MM/DD/YYYY, hh:mm A')}
                              </p>
                            ) : null}
                          </Show>
                        </Select>

                        <div className="grid gap-1 md:mt-2">
                          <h5 className="title">Summary</h5>
                          <div className="grid gap-2 rounded-[7px] border-[1px] border-text-10 py-1.75 md:gap-4  md:py-3.75">
                            <div className="grid gap-2 px-2 md:px-4">
                              {[
                                { name: 'Price', value: `${price} BUSD` },
                                {
                                  name: 'Creator earnings',
                                  value: `${creatorEarningLoading ? '...' : creatorEarning}%`,
                                },
                                {
                                  name: 'Fleamint fee ',
                                  value: `${fleamintFeeLoading ? '...' : fleamintFee[1]}%`,
                                },
                              ].map((value) => (
                                <p
                                  key={value.name}
                                  className="flex justify-between text-body2 text-text-80"
                                >
                                  <span>{value.name}: </span>
                                  <span>{value.value}</span>
                                </p>
                              ))}
                            </div>

                            <div className="flex justify-between border-t border-text-10 px-2 pt-1.75 text-body2  text-text-80  md:px-4 md:pt-3.75">
                              <span>Total estimated earnings</span>
                              <span>{totalEstimatedEarnings} BUSD</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                isLoading={loading}
                type="submit"
                className="btnlg mx-auto md:mx-0 ow:md:w-62.5"
              >
                Create
              </Button>
            </div>
          </form>
        </FormProvider>
        <Show when={open}>
          <AddPropertiesModal
            open={open}
            onOpen={setOpen}
            setValuesProperties={setValuesProperties}
            properties={getValues('properties')}
          />
        </Show>
      </div>
    </div>
  );
}

const PropertyItem = ({ name, type }: { name: string; type: string }) => (
  <div
    className={classcat([
      'flex h-19 w-20.5 flex-col items-center justify-center space-y-2 text-body3',
      'rounded-lg border border-text-50',
    ])}
  >
    <p className="text-text-30">{type}</p>
    <p className="text-white">{name}</p>
  </div>
);

const expirationList = [
  {
    label: '30 days',
    value: '30',
  },
  {
    label: '60 days',
    value: '60',
  },
  {
    label: 'No expiration',
    value: '0',
  },
];
