//THIRD PARTY MODULES
'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormRadioGroup from '_@shared/components/radio/FormRadioGroup';

const OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const schema = z.object({
  gender: z.string().nonempty(),
});

type FormValues = z.infer<typeof schema>;

export default function Page() {
  const methods = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      gender: 'male',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <div className="px-[--px] py-30">
      <FormProvider {...methods}>
        <form className="bg-secondary-200" onSubmit={onSubmit}>
          <FormItem label="Gender" name="gender">
            <FormRadioGroup
              options={OPTIONS}
              ariaLabel="Choose your gender"
              className="auto-cols-max grid-flow-col gap-[77px] pl-[23px]"
            />
          </FormItem>

          <Button type="submit" className="mt-5">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
