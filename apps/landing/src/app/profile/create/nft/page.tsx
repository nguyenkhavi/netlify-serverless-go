'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Breadcrumb from '_@landing/app/profile/create/comps/Breadcrumb';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import UploadImage from '_@landing/components/UploadImage';
import FormSwitch from '_@shared/components/switch/FormSwitch';
//SHARED
import PadlockIcon from '_@shared/icons/PadlockIcon';
import RoundListIcon from '_@shared/icons/RoundListIcon';
import FixedOfferIcon from '_@shared/icons/FixedOfferIcon';
//RELATIVE MODULES
import './styles.css';
import Group from '../comps/Group';
import Select from '../comps/Select';
import BaseInput, { Input } from '../comps/Input';
import AddPropertiesModal from '../comps/AddPropertiesModal';

export default function CreateCollectionPage() {
  const [open, setOpen] = useState(false);
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
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
            'lg:pb-8 lg:pl-48 lg:pr-31 lg:pt-11',
            'sm:py-4 sm:pl-14 sm:pr-10',
            'border-text-30 md:border-[1px]',
            'md:rounded-[10px] md:bg-secondary-200',
          ])}
        >
          <div className="grid max-w-[674px] gap-7 md:gap-8.5">
            <div className="grid gap-3.5 md:gap-3">
              <h3 className="text-h3 text-primary-700 md:text-h2">Create NFT</h3>
              <div className="grid gap-1.25 md:gap-0">
                <div>
                  <p>
                    <span className="text-error">*</span>{' '}
                    <span className="text-body3 text-text-50">Required fields</span>
                  </p>
                </div>
                <div className="grid gap-5 md:gap-6.25">
                  <div>
                    <div className="grid gap-4">
                      <div className="grid gap-1.25">
                        <h5 className="title">Image</h5>
                        <p className="description">
                          File types supported: JPG, PNG, GIF, SVG. Max size: 30 MB
                        </p>
                      </div>
                      <UploadImage className="w-62 md:h-51 md:w-84" />
                    </div>
                  </div>

                  {[
                    {
                      title: 'Name*',
                      description: '',
                      name: 'name',
                      placeholder: 'Item name',
                    },
                    {
                      title: 'Description',
                      description:
                        "The description will be included on the item's detail page underneath its image.",
                      name: 'description',
                      placeholder: 'Write description',
                      type: 'textarea',
                    },
                  ].map((value) => (
                    <BaseInput
                      key={value.name}
                      title={value.title}
                      name={value.name}
                      description={value.description}
                      placeholder={value.placeholder}
                      type={value.type}
                    />
                  ))}
                  <Select
                    title="Collection"
                    description="Do you want to add this item to a collection?Select collection below"
                    name="collection"
                    data={[]}
                    placeholder="Select collection"
                  />

                  <Group
                    title="Unlockable Content"
                    description="Content will be unlocked after successful transaction"
                    underline
                    actionRender={
                      <div className="grid place-content-center">
                        <FormSwitch name="content.status" />
                      </div>
                    }
                    icon={<PadlockIcon />}
                  >
                    <div className="py-5">
                      <Input
                        title=""
                        name={'content.value'}
                        placeholder="Digital key, link to a file....."
                      />
                    </div>
                  </Group>

                  <Group
                    title="Properties"
                    description="Textual traits that show up as rectangles"
                    actionRender={
                      <button
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
                    }
                    icon={<RoundListIcon />}
                  >
                    <div className="py-5">
                      <Input
                        title=""
                        name={'properties.value'}
                        placeholder="Digital key, link to a file....."
                      />
                    </div>
                  </Group>

                  {[
                    {
                      title: 'Supply',
                      description: 'The number of items that can be minted. No gas cost to you',
                      name: 'supply',
                      placeholder: 'Enter number',
                    },
                    {
                      title: 'Collection name*',
                      description: '',
                      name: 'collectionName',
                      placeholder: 'Example: tenure of the sea',
                    },
                  ].map((value) => (
                    <BaseInput
                      key={value.name}
                      title={value.title}
                      name={value.name}
                      description={value.description}
                      placeholder={value.placeholder}
                    />
                  ))}

                  <Select
                    title="Blockchain"
                    name="blockchain"
                    data={[]}
                    placeholder="Select blockchain"
                  />

                  <Group
                    title="List on Marketplace"
                    description="Enter price to allow users instantly purchase your NFT"
                    className="pt-2 ow:border-text-30 md:pt-2.5"
                    actionRender={
                      <div className="grid h-full items-start">
                        <FormSwitch name="marketplace.status" />
                      </div>
                    }
                  >
                    <div className="grid gap-5">
                      <div className="border-green-gradient mt-3.75 grid h-41.25 w-71 place-content-center">
                        <div className="w-17.5 text-center">
                          <FixedOfferIcon className="mx-auto" />
                          <span className="text-green-gradient">Fixed Price</span>
                        </div>
                      </div>

                      <BaseInput
                        inputProps={{ trailingComponent: <>BUSD</> }}
                        title="Price"
                        name="Price"
                        placeholder='Enter price, e.g. "1.5"'
                      />

                      <Select
                        title="Listing expiration"
                        name="listingExpiration"
                        placeholder="Listing expiration"
                        data={[]}
                      >
                        <p className="text-body3 text-text-50">Expiration at 5/31/2023, 3:31 PM</p>
                      </Select>

                      <div className="mb-4.25 grid gap-2.5 md:mb-8">
                        <h5 className="title">Summary</h5>
                        <div className="rounded-[7px] border-[0.5px] border-text-50 pb-4 pt-1.5">
                          <div className="grid gap-0.5 px-4">
                            {[
                              { name: 'Price', value: '13 BUSD' },
                              { name: 'Creator earnings', value: '1%' },
                              { name: 'Fleamint fee ', value: '1%' },
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
                          <hr className="mb-5 mt-2.5 border-text-50" />
                          <div className="flex justify-between px-4 text-body2 text-text-80">
                            <span>Total estimated earnings</span>
                            <span>11.88 BUSD</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Group>
                </div>
              </div>
            </div>
            <Button className="btnmd mx-auto md:btnlg ow:w-34.5 md:mx-0 ow:md:w-62.5">
              Create
            </Button>
          </div>
        </form>
      </FormProvider>
      <AddPropertiesModal name="properties.value" open={open} onOpen={setOpen} />
    </div>
  );
}
