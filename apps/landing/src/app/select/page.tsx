'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormSelect from '_@shared/components/FormSelect';

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

const schema = z.object({
  month: z.string().nonempty(),
});

type FormValues = z.infer<typeof schema>;

export default function Page() {
  const methods = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    // defaultValues: {
    //   month: '8',
    // },
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="bg-secondary-200 px-[--px] py-30">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormSelect
            name="month"
            fieldLabel="Month"
            placeholder="Select a month"
            options={OPTIONS}
          />

          <Button type="submit" className="mt-5">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
