'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';
import FormSelect from '_@shared/components/FormSelect';
//SHARED
import { enterNumberOnly } from '_@shared/utils/checkNumberInputOnly';

const schema = z.object({
  about: z.string(),
  description: z.string(),
  street_address: z.string(),
  country: z.string(),
  state: z.string(),
  street_address_2: z.string(),
  apartment_number: z.string(),
  postcode: z.string(),
  contact_number: z.string(),
  additional_info: z.string(),
});

const inputClasses = 'h-11.25 ow:rounded lg:h-15';

type FormValues = z.infer<typeof schema>;

export default function AddNewAddress() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  // const { user } = useUser();
  // console.log(user?.getSessions());

  const { handleSubmit } = methods;

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-[10px] bg-secondary-200 p-3">
          <h2 className="mb-6.5 text-h6 lg:text-h5-bold">Shipping information</h2>
          <div className="grid gap-2.5 lg:grid-cols-2 ">
            <FormItem label="Country" name="country" className="ow:gap-1">
              <FormSelect
                placeholder="Select a country"
                options={OPTIONS}
                owStyles={{ triggerClasses: 'ow:h-11.25 ow:lg:h-15' }}
              />
            </FormItem>
            <FormItem label="State" name="state" className="ow:gap-1">
              <FormSelect
                placeholder="Select a state"
                options={OPTIONS}
                owStyles={{ triggerClasses: 'ow:h-11.25 ow:lg:h-15' }}
              />
            </FormItem>
            <FormItem label="Street Address" name="street_address" className="ow:gap-1">
              <FormInput
                className={inputClasses}
                placeholder="Al Khaleej Al Arabi Street, Abu Dhabi"
              />
            </FormItem>
            <FormItem label="Street Address 2" name="street_address_2" className="ow:gap-1">
              <FormInput
                className={inputClasses}
                placeholder="Al Khaleej Al Arabi Street, Abu Dhabi"
              />
            </FormItem>
            <FormItem label="Apartment Number" name="apartment_number" className="ow:gap-1">
              <FormInput className={inputClasses} placeholder="Apartment 2" />
            </FormItem>
            <FormItem label="Postcode" name="postcode" className="ow:gap-1">
              <FormInput
                className={inputClasses}
                placeholder="581234"
                onKeyDown={enterNumberOnly}
              />
            </FormItem>
            <FormItem label="Contact number" name="contact_number" className="ow:gap-1">
              <FormInput
                className={inputClasses}
                placeholder="34535464454"
                onKeyDown={enterNumberOnly}
              />
            </FormItem>
            <FormItem label="Additional info" name="additional_info" className="ow:gap-1">
              <FormInput
                tag="textarea"
                placeholder="Info..."
                className="block h-22 resize-none ow:rounded lg:h-15 lg:pt-4"
              />
            </FormItem>
          </div>
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
