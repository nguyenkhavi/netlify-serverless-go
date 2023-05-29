'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export default function Page() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-secondary-200 py-30 grid gap-[15px] px-[--px]"
      >
        <FormItem label="Email" name="email">
          <FormInput
            placeholder="Email verification Code"
            trailingComponent={
              <button className="text-body3 text-primary hover:underline">Send Code</button>
            }
          />
        </FormItem>

        <FormItem label="Password" name="password">
          <FormInput type="password" placeholder="Enter your password" />
        </FormItem>

        <FormItem label="About" name="about">
          <FormInput tag="textarea" placeholder="Write about yourself.." />
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
