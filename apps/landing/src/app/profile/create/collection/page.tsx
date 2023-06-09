'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { FormProvider, useForm } from 'react-hook-form';
import Breadcrumb from '_@landing/app/profile/create/comps/Breadcrumb';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
import FormSelect from '_@shared/components/FormSelect';
import { TagInput } from '_@shared/components/BaseInput';
import UploadImage from '_@landing/components/UploadImage';
import FormSwitch from '_@shared/components/switch/FormSwitch';
//SHARED
import BUSDIcon from '_@shared/icons/BUSDIcon';
import PadlockIcon from '_@shared/icons/PadlockIcon';
//RELATIVE MODULES
import './styles.css';

const Icons = {
  BUSD: <BUSDIcon />,
} as const;
const blockchainOptions: { value: keyof typeof Icons; label: string }[] = [
  { value: 'BUSD', label: 'BUSD' },
];

export default function CreateCollectionPage() {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className="create-collection grid md:gap-3">
      <Breadcrumb
        paths={[
          {
            name: 'My Collections',
            href: '/profile/my-items',
          },
          {
            name: 'Create Collection',
            href: '/profile/create/collection',
          },
        ]}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
          className={classcat([
            'lg:pb-3 lg:pl-48 lg:pr-31 lg:pt-11',
            'sm:py-4 sm:pl-14 sm:pr-10',
            'border-[#18181A] md:border-[0.5px]',
            'md:rounded-[10px] md:bg-secondary-200',
          ])}
        >
          <div className="grid max-w-[theme(spacing[168.5])] gap-8 md:gap-4.5">
            <h3 className="text-h3 text-primary-700 md:text-h2">Create a Collection</h3>
            <div className="grid gap-0.5">
              <div>
                <p>
                  <span className="text-error">*</span>{' '}
                  <span className="text-body3 text-text-50">Required fields</span>
                </p>
              </div>
              <div className="grid gap-5">
                {[
                  {
                    title: 'Collection name',
                    description: `This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of Fleamint. 600 x 400 recommended.`,
                    imageClasses: 'w-62',
                  },
                  {
                    title: 'Banner image',
                    description: `This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 350 recommended.`,
                    imageClasses: 'max-w-[theme(spacing[110.5])] w-full',
                  },
                ].map((value) => (
                  <section key={value.title}>
                    <div className="grid gap-4">
                      <div className="grid gap-1">
                        <h5 className="title">{value.title}</h5>
                        <p className="description">{value.description}</p>
                      </div>
                      <UploadImage className={value.imageClasses} />
                    </div>
                  </section>
                ))}

                {[
                  {
                    title: 'Collection name*',
                    description: '',
                    name: 'collectionName',
                    placeholder: 'Example: tenure of the sea',
                  },
                  {
                    title: 'URL',
                    description:
                      'Set your collection URL for Fleamint. This would create a custom link for your collection',
                    name: 'collectionUrl',
                    placeholder: 'https//:fleamint.com/collection/enter-your-value',
                  },
                  {
                    title: 'Description',
                    description: 'Write a description of your collection',
                    name: 'collectionDescription',
                    placeholder: 'Write description....',
                    type: 'textarea',
                  },
                ].map((value) => (
                  <FormItem
                    key={value.title}
                    className="ow:gap-4"
                    label={
                      <div className="grid gap-1">
                        <h5 className="title">{value.title}</h5>
                        <Show when={value.description}>
                          <p className="description">{value.description}</p>
                        </Show>
                      </div>
                    }
                    name="collectionName"
                  >
                    <FormInput
                      tag={(value.type || 'input') as TagInput}
                      name={value.name}
                      className={classcat([
                        value.type === 'textarea'
                          ? 'resize-none text-body3 ow:h-27'
                          : 'ow:h-10.5 ow:rounded-[7px]',
                      ])}
                      placeholder={value.placeholder}
                      {...(value.type === 'textarea'
                        ? {
                            rows: 4,
                          }
                        : {})}
                    />
                  </FormItem>
                ))}

                {[
                  {
                    title: 'Category',
                    description: 'Select the category your collection falls under',
                    name: 'category',
                    placeholder: 'Select the catagory',
                    data: [],
                  },
                  {
                    title: 'Blockchain',
                    description:
                      "Select the blockchain where you'd like new items from this collection to be added by default.",
                    name: 'blockchain',
                    placeholder: 'Select the blockchain',
                    data: [],
                  },
                ].map((value) => (
                  <FormItem
                    key={value.title}
                    className="ow:gap-4"
                    label={
                      <div className="grid gap-1">
                        <h5 className="title">{value.title}</h5>
                        <Show when={value.description}>
                          <p className="description">{value.description}</p>
                        </Show>
                      </div>
                    }
                    name={value.name}
                  >
                    <FormSelect
                      owStyles={{
                        triggerClasses: 'ow:h-10.5 rounded-[7px]',
                      }}
                      name={value.name}
                      options={value.data}
                      placeholder={value.placeholder}
                    />
                  </FormItem>
                ))}

                <FormItem
                  className="ow:gap-4"
                  label={
                    <div className="grid gap-1">
                      <h5 className="title">Payment tokens</h5>
                      <p className="description">
                        These tokens can be used to buy and sell your items.
                      </p>
                    </div>
                  }
                  name="paymentTokens"
                >
                  <>
                    {blockchainOptions.map((value) => {
                      const Icon = Icons[value.value];
                      return (
                        <Button
                          variant="outlined"
                          color="default"
                          className="ow:w-39.5"
                          key={value.value}
                          leadingIcon={Icon}
                        >
                          <span>{value.value}</span>
                        </Button>
                      );
                    })}
                  </>
                </FormItem>

                <div className="grid gap-9 rounded-[10px] border border-text-10 p-3 md:p-9">
                  <FormItem name="createEarnings" label="Create earnings">
                    <FormInput
                      className="ow:h-10.5 ow:rounded-[7px]"
                      name="createEarnings"
                      placeholder='Example: "10"'
                      trailingComponent={
                        <span className="text-[14px] leading-[26px] text-primary-700">%</span>
                      }
                    />
                  </FormItem>
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-20">
                      <div className="flex space-x-3">
                        <PadlockIcon className="shrink-0" />
                        <div>
                          <h5 className="title text-primary-700">External wallet</h5>
                          <p className="text-body3 text-text-50">
                            Toggle this on if you would like to send your creator earnings to an
                            external wallet address.
                          </p>
                        </div>
                      </div>
                      <FormSwitch name="externalWallet" className="shrink-0" />
                    </div>
                    <FormItem name="walletAddress" label="" labelClasses="hidden">
                      <FormInput
                        className="ow:h-10.5 ow:rounded-[7px]"
                        name="walletAddress"
                        placeholder="Wallet address"
                      />
                    </FormItem>
                  </div>
                </div>
              </div>
            </div>
            <Button className="btnmd md:btnlg ow:w-34.5 ow:md:w-62.5">Create</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
