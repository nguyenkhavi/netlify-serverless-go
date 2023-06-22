'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
import FormSelect from '_@shared/components/FormSelect';
//SHARED
import { toastStore } from '_@shared/stores/toast/toastStore';
import { enterNumberOnly } from '_@shared/utils/checkNumberInputOnly';
//RELATIVE MODULES
import { MOCK_DATA } from '../page';

const schema = z.object({
  name: z.string().optional(),
  country: z.string(),
  state: z.string(),
  streetAddress: z.string().nonempty('This field is required'),
  streetAddress2: z.string().optional(),
  apartmentNumber: z.string().nonempty('This field is required'),
  postcode: z.string().nonempty('This field is required'),
  contactNumber: z.string().nonempty('This field is required'),
  additionalInfo: z.string(),
});

const inputClasses = 'h-11.25 ow:rounded lg:h-15';
export type FormValues = z.infer<typeof schema> & { id: string | number; isDefault: boolean };
type CreateEditAddress = {
  id?: string | number;
  type?: 'create' | 'edit';
};

export default function CreateEditAddress({ id, type }: CreateEditAddress) {
  const { openToast } = toastStore();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = form;

  const onSubmit = (values: FormValues) => {
    console.log(id, values);
    type === 'create'
      ? openToast('Create address successfully')
      : openToast('Update address successfully');
  };

  const _handleCancel = () => {
    form.reset();
    router.push('/profile/address');
  };

  useEffect(() => {
    if (type === 'edit' && id) {
      const data = MOCK_DATA.find((item) => +item.id === +id);
      form.setValue('name', data?.name || '');
      form.setValue('streetAddress', data?.streetAddress || '');
      form.setValue('country', data?.country || '');
      form.setValue('state', data?.state || '');
      form.setValue('streetAddress2', data?.streetAddress2 || '');
      form.setValue('apartmentNumber', data?.apartmentNumber || '');
      form.setValue('postcode', data?.postcode || '');
      form.setValue('contactNumber', data?.contactNumber || '');
      form.setValue('additionalInfo', data?.additionalInfo || '');
    }
  }, [id, type, form]);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 lg:mt-0">
        <div className="rounded-[10px] bg-secondary-200 pb-8">
          <h2
            className={classcat([
              'text-h6 lg:border-b lg:border-text-10 lg:text-h5-bold',
              'mb-6 p-4 pb-0 lg:mb-4 lg:px-10 lg:pb-4',
            ])}
          >
            {type === 'create' ? 'Add New Shipping Address' : 'Edit Shipping Address'}
          </h2>
          <div className="grid gap-2.5 px-4 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-1 lg:px-10">
            <FormItem label="Country" name="country" className="ow:gap-1">
              <FormSelect
                placeholder="Select Country"
                options={OPTIONS}
                owStyles={{ triggerClasses: 'ow:h-11.25 ow:lg:h-15' }}
              />
            </FormItem>
            <FormItem label="State" name="state" className="ow:gap-1">
              <FormSelect
                placeholder="Select State"
                options={OPTIONS}
                owStyles={{ triggerClasses: 'ow:h-11.25 ow:lg:h-15' }}
              />
            </FormItem>
            <FormItem label="Street Address" name="streetAddress" className="ow:gap-1">
              <FormInput className={inputClasses} placeholder="Street Address" />
            </FormItem>
            <FormItem label="Street Address 2" name="streetAddress2" className="ow:gap-1">
              <FormInput className={inputClasses} placeholder="Street address 2" />
            </FormItem>
            <FormItem label="Apartment Number" name="apartmentNumber" className="ow:gap-1">
              <FormInput className={inputClasses} placeholder="Apartment Number" />
            </FormItem>
            <FormItem label="Postcode" name="postcode" className="ow:gap-1">
              <FormInput
                className={inputClasses}
                placeholder="Postcode"
                onKeyDown={enterNumberOnly}
              />
            </FormItem>
            <FormItem label="Contact number" name="contactNumber" className="ow:gap-1">
              <FormInput
                className={inputClasses}
                placeholder="34535464454"
                onKeyDown={enterNumberOnly}
              />
            </FormItem>
            <FormItem label="Additional info" name="additionalInfo" className="ow:gap-1">
              <FormInput
                tag="textarea"
                placeholder="Info..."
                className="block h-22 resize-none ow:rounded lg:h-15 lg:pt-4"
              />
            </FormItem>
          </div>
        </div>
        <div className="mt-4 flex justify-center lg:justify-end">
          <Button
            className="btnsm mr-2.5 w-max lg:btnmd"
            variant="outlined"
            onClick={_handleCancel}
          >
            Cancel
          </Button>
          <Button className="btnsm w-max lg:btnmd" type="submit">
            {type === 'create' ? 'Create' : 'Save'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

const OPTIONS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];
