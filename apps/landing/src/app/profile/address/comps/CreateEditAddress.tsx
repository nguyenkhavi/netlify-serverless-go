'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import { useRouter } from 'next/navigation';
import { getQueryKey } from '@trpc/react-query';
import { Country, State } from 'country-state-city';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { RouterOutputs, api, nextApi } from '_@landing/utils/api';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
import FormSelect from '_@shared/components/FormSelect';
import FormPhoneInput from '_@shared/components/input/phone-input/FormPhoneInput';
//SHARED
import { CloseBigIcon } from '_@shared/icons/CloseIcon';
import { toastAction } from '_@shared/stores/toast/toastStore';
import { enterNumberOnly } from '_@shared/utils/checkNumberInputOnly';

const schema = z.object({
  country: z.string({
    required_error: 'This field is required',
  }),
  state: z.string({
    required_error: 'This field is required',
  }),
  street: z.string().nonempty('This field is required'),
  secondStreet: z.string().nonempty('This field is required'),
  apartmentNumber: z.string().nonempty('This field is required'),
  postalCode: z.string().nonempty('This field is required'),
  dialCode: z.string().nonempty('This field is required'),
  contactNumber: z.string().nonempty('This field is required'),
  additionalInformation: z.string(),
});

export type FormValues = z.infer<typeof schema> & { id: string | number; isDefault: boolean };
type CreateEditAddress = {
  id?: string | number;
  type?: 'create' | 'edit';
  defaultData?: RouterOutputs['userGetAllShippingAddress'][number];
};

const FormItemWithSchema = (
  props: Omit<ComponentPropsWithoutRef<typeof FormItem>, 'name'> & { name: keyof FormValues },
) => {
  return <FormItem {...props} name={props.name} />;
};

export default function CreateEditAddress({ id, type, defaultData }: CreateEditAddress) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultData
      ? {
          additionalInformation: defaultData.additionalInformation || '',
          apartmentNumber: defaultData.apartmentNumber || '',
          contactNumber: defaultData.contactNumber || '',
          country: defaultData.country || '',
          state: defaultData.state || '',
          street: defaultData.street || '',
          secondStreet: defaultData.secondStreet || '',
          postalCode: defaultData.postalCode || '',
          dialCode: defaultData.dialCode || 'GB',
        }
      : { dialCode: 'GB' },
  });

  const { handleSubmit, watch } = form;

  const onSubmit = handleSubmit(async (values) => {
    try {
      setLoading(true);

      if (type === 'create') {
        await api.userCreateShippingAddress.mutate({
          ...values,
          secondStreet: values.secondStreet || '',
          isDefault: false,
        });
      } else if (id) {
        await api.userUpdateShippingAddressById.mutate({
          ...values,
          secondStreet: values.secondStreet || '',
          isDefault: defaultData?.isDefault || false,
          id: Number(id),
        });
      }
      await queryClient.invalidateQueries(getQueryKey(nextApi.userGetAllShippingAddress));
      router.push('/profile/address');
      toastAction.openToast(
        type === 'create' ? 'Create address successfully' : 'Update address successfully',
        'success',
      );
    } catch (err) {
      console.log(err);
      toastAction.openToast('Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  });

  const _handleCancel = () => {
    form.reset();
    router.push('/profile/address');
  };

  useEffect(() => {
    if (type === 'edit' && !defaultData) {
      router.push('/profile/address');
    }
  }, [defaultData, router, type]);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="bg-secondary-200">
        <div className="rounded-[10px]">
          <div className="flex items-center border-b border-text-10 p-4 py-5.25 lg:p-6">
            <h2 className={classcat(['grow text-h6 lg:text-h5-bold'])}>
              {type === 'create' ? 'Add New Shipping Address' : 'Edit Shipping Address'}
            </h2>
            <button type="button" onClick={_handleCancel} className="lg:hidden">
              <CloseBigIcon />
            </button>
          </div>

          <div className="grid gap-8 p-4 lg:p-6">
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-8 ">
              <FormItemWithSchema label="Country" name="country" className="auto-rows-min">
                <FormSelect
                  placeholder="Select Country"
                  owStyles={{
                    triggerClasses: 'select-md',
                  }}
                  options={Country.getAllCountries().map((item) => ({
                    value: item.isoCode,
                    label: item.name,
                  }))}
                />
              </FormItemWithSchema>
              <FormItemWithSchema label="State" name="state" className="auto-rows-min">
                <FormSelect
                  placeholder="Select State"
                  owStyles={{
                    triggerClasses: 'select-md',
                  }}
                  options={State.getStatesOfCountry(watch('country')).map((item) => ({
                    label: item.name,
                    value: item.isoCode,
                  }))}
                />
              </FormItemWithSchema>
              <FormItemWithSchema label="Street Address" name="street" className="auto-rows-min">
                <FormInput className="input-md" placeholder="Street Address" />
              </FormItemWithSchema>
              <FormItemWithSchema
                label="Street Address 2"
                name="secondStreet"
                className="auto-rows-min"
              >
                <FormInput className="input-md" placeholder="Street address 2" />
              </FormItemWithSchema>
              <FormItemWithSchema
                label="Apartment Number"
                name="apartmentNumber"
                className="auto-rows-min"
              >
                <FormInput className="input-md" placeholder="Apartment Number" />
              </FormItemWithSchema>
              <FormItemWithSchema label="Postcode" name="postalCode" className="auto-rows-min">
                <FormInput
                  className="input-md"
                  placeholder="Postcode"
                  onKeyDown={enterNumberOnly}
                />
              </FormItemWithSchema>
              <FormItemWithSchema
                label="Contact number"
                name="contactNumber"
                className="auto-rows-min"
              >
                <>
                  <FormPhoneInput
                    name={{
                      digitalCode: 'dialCode',
                      phoneNumber: 'contactNumber',
                    }}
                  />
                </>
              </FormItemWithSchema>
              <FormItemWithSchema
                label="Additional info"
                name="additionalInformation"
                className="auto-rows-min"
              >
                <FormInput placeholder="Info" className="input-md" />
              </FormItemWithSchema>
            </div>
            <div className="grid grid-flow-col grid-cols-2 justify-center gap-3 lg:mb-0 lg:grid-cols-none lg:justify-end">
              <Button
                className="btnsm w-full lg:w-29.25"
                variant="outlined"
                onClick={_handleCancel}
              >
                Cancel
              </Button>
              <Button isLoading={loading} className="btnsm w-full lg:w-34.75" type="submit">
                {type === 'create' ? 'Create' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
