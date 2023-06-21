'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '_@landing/app/profile/create/comps/Input';
import Select from '_@landing/app/profile/create/comps/Select';
import Breadcrumb from '_@landing/app/profile/create/comps/Breadcrumb';
import ProfileNavMobile from '_@landing/app/profile/comps/ProfileNavMobile';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
import UploadImage from '_@landing/components/UploadImage';
import FormSwitch from '_@shared/components/switch/FormSwitch';
//SHARED
import BUSDIcon from '_@shared/icons/BUSDIcon';
import PadlockIcon from '_@shared/icons/PadlockIcon';
import PercentIcon from '_@shared/icons/PercentIcon';
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
              name: 'Create Collection',
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
                      },
                      {
                        title: 'Banner image',
                        description: `This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 350 recommended.`,
                        imageClasses: 'max-w-[theme(spacing[110.5])] w-full ow:h-32.5',
                      },
                    ].map((value) => (
                      <section key={value.title}>
                        <div className="grid gap-4">
                          <div className="grid gap-1">
                            <h5 className="title">
                              {value.title}
                              {value.required && <span className="text-error">*</span>}
                            </h5>
                            <p className="description">{value.description}</p>
                          </div>
                          <UploadImage className={value.imageClasses} />
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
                        name: 'collectionUrl',
                        placeholder: 'https//:fleamint.com/collection/enter-your-value',
                      },
                      {
                        title: 'Description',
                        description: 'Write a description of your collection',
                        name: 'collectionDescription',
                        placeholder: 'Write description....',
                        type: 'textarea',
                        required: true,
                      },
                    ].map((value) => (
                      <Input
                        inputProps={{
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
                        data: [],
                        required: true,
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
                      <Select
                        key={value.title}
                        title={value.title}
                        description={value.description}
                        name={value.name}
                        placeholder={value.placeholder}
                        data={value.data}
                        required={value.required}
                      />
                    ))}

                    <FormItem
                      className="ow:gap-1"
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
                              className="btnxlg ow:w-27.5 [&>span]:font-normal [&>span]:text-text-80"
                              key={value.value}
                              leadingIcon={Icon}
                            >
                              {value.value}
                            </Button>
                          );
                        })}
                      </>
                    </FormItem>

                    <div className="grid gap-8 rounded-lg border border-text-10 p-3.75 md:p-5.75">
                      <FormItem
                        label={<p className="text-body2 md:text-h5-bold">Create earnings</p>}
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
                        <Input
                          name="walletAddress"
                          placeholder="Wallet address"
                          title=""
                          labelClasses="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="btnlg ow:w-full ow:md:w-62.5">Create</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
